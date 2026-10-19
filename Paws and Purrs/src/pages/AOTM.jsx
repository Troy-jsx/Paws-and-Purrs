import { useEffect, useState } from "react";
import { api } from "../api";

export default function AOTM() {
  const [animals, setAnimals] = useState([]);
  const [current, setCurrent] = useState(null);
  const [selectedId, setSelectedId] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([api("/animals"), api("/animal-of-the-month")])
      .then(([list, chosen]) => {
        setAnimals(list);
        setCurrent(chosen);
        setSelectedId(chosen?.id ?? "");
        if (!chosen) setIsEditing(true);
      })
      .catch((err) => setError(err.message));
  }, []);

  const shown = isEditing ? animals.find((a) => a.id === selectedId) ?? null : current;

  async function handleMainButton() {
    if (!isEditing) return setIsEditing(true);
    if (!selectedId) return setError("Choose an animal first.");

    setError("");
    setSaving(true);
    try {
      const saved = await api("/animal-of-the-month", {
        method: "PUT",
        body: { animalId: selectedId },
      });
      setCurrent(saved);
      setIsEditing(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  function handleCancel() {
    setSelectedId(current?.id ?? "");
    setIsEditing(false);
    setError("");
  }

  return (
    <main className="flex min-w-0 flex-1 flex-col gap-8 overflow-y-auto px-4 py-8 md:gap-12 md:px-8 md:py-10">
      <h1 className="select-none font-display text-[48px] text-magenta-500 [text-box:trim-both_cap_alphabetic] md:text-[64px] xl:text-[80px]">
        Animal of the Month
      </h1>

      {error && (
        <p role="alert" className="rounded-lg bg-danger/20 px-4 py-3 font-josefin text-[18px] font-semibold text-danger">
          {error}
        </p>
      )}

      {/* Picker */}
      {isEditing && (
        <section className="flex flex-col gap-4">
          <h2 className="font-josefin text-[20px] font-semibold text-magenta-500 md:text-[22px]">
            Choose from the adoption list
          </h2>

          {animals.length === 0 ? (
            <p className="rounded-lg bg-magenta-500 p-6 font-josefin text-[18px] font-semibold text-magenta-100">
              No animals yet. Add some on the Adoption page first.
            </p>
          ) : (
            <ul className="flex gap-4 overflow-x-auto pb-2">
              {animals.map((a) => {
                const selected = a.id === selectedId;
                return (
                  <li key={a.id} className="shrink-0">
                    <button
                      type="button"
                      onClick={() => setSelectedId(a.id)}
                      aria-pressed={selected}
                      className={`flex w-[140px] flex-col gap-2 rounded-lg p-2 text-left transition-colors ${
                        selected ? "bg-pink-base" : "bg-magenta-500 hover:bg-magenta-400"
                      }`}
                    >
                      <div className="h-[120px] overflow-hidden rounded-md bg-[#4d4d4d]">
                        {a.image && <img src={a.image} alt="" className="size-full object-cover" />}
                      </div>
                      <span
                        className={`truncate font-josefin text-[16px] font-semibold ${
                          selected ? "text-magenta-500" : "text-magenta-100"
                        }`}
                      >
                        {a.name}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      )}

      {/* Preview / current */}
      <div className="flex flex-col gap-4 rounded-lg bg-magenta-500 p-4">
        {shown ? (
          <>
            <div className="h-[240px] overflow-hidden rounded-lg bg-[#cbcbcb] sm:h-[360px] xl:h-[420px]">
              {shown.image && <img src={shown.image} alt={shown.name} className="size-full object-cover" />}
            </div>
            <h2 className="px-2 font-display text-[32px] leading-[1.2] text-magenta-100 sm:text-[40px] xl:text-[56px]">
              {shown.name}
            </h2>
            <div className="flex flex-wrap gap-2">
              <Badge>{shown.gender}</Badge>
              <Badge>Estimated Age: {shown.age}</Badge>
            </div>
            <p className="px-2 text-justify font-josefin text-[18px] font-semibold leading-[1.2] text-magenta-100 md:text-[20px]">
              {shown.description}
            </p>
          </>
        ) : (
          <p className="p-8 text-center font-josefin text-[20px] font-semibold text-magenta-100">
            {isEditing ? "Pick an animal above to preview it here." : "No Animal of the Month chosen yet."}
          </p>
        )}
      </div>

      <div className="flex gap-4">
        {isEditing && current && (
          <button
            type="button"
            onClick={handleCancel}
            className="h-14 flex-1 rounded-lg bg-pink-base font-josefin text-[20px] font-semibold text-magenta-500 transition-colors hover:bg-pink-200 md:h-16 md:text-[22px]"
          >
            Cancel
          </button>
        )}
        <button
          type="button"
          onClick={handleMainButton}
          disabled={saving}
          className="h-14 flex-1 rounded-lg bg-magenta-400 font-josefin text-[20px] font-semibold text-magenta-100 drop-shadow-[0_4px_2px_#3b023d] transition-colors hover:bg-[#c92fcf] disabled:opacity-60 md:h-16 md:text-[22px]"
        >
          {saving ? "Saving..." : isEditing ? "Finish Editing" : "Edit"}
        </button>
      </div>
    </main>
  );
}

function Badge({ children }) {
  return (
    <span className="flex h-[42px] min-w-[120px] flex-1 items-center justify-center rounded-lg bg-pink-200 px-4 font-josefin text-[15px] font-medium whitespace-nowrap text-magenta-500">
      {children}
    </span>
  );
}