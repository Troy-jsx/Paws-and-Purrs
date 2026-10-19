import DonationBar from "../components/DonationBar.jsx";
import DonutChart from "../components/DonutChart.jsx";
import { useEffect, useState } from "react";
import { api } from "../api";

export default function ShelterDonations() {
  const [categories, setCategories] = useState([]);
  const [animalsSaved, setAnimalsSaved] = useState([]);
  const [editingCategories, setEditingCategories] = useState(false);
  const [editingAnimals, setEditingAnimals] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([api("/categories"), api("/animal-stats")])
      .then(([categoryData, statData]) => {
        setCategories(categoryData);
        setAnimalsSaved(statData);
      })
      .catch((err) => setError(err.message));
  }, []);

  function updateCategory(id, field, value) {
    setCategories((list) =>
      list.map((c) => (c.id === id ? { ...c, [field]: Number(value) } : c)),
    );
  }

  function updateAnimal(id, value) {
    setAnimalsSaved((list) =>
      list.map((a) => (a.id === id ? { ...a, value: Number(value) } : a)),
    );
  }

  async function toggleCategories() {
    if (!editingCategories) return setEditingCategories(true);
    try {
      const saved = await api("/categories", {
        method: "PUT",
        body: categories.map(({ id, raised, goal }) => ({ id, raised, goal })),
      });
      setCategories(saved);
      setEditingCategories(false);
      setError("");
    } catch (err) {
      setError(err.message);
    }
  }

  async function toggleAnimals() {
    if (!editingAnimals) return setEditingAnimals(true);
    try {
      const saved = await api("/animal-stats", {
        method: "PUT",
        body: animalsSaved.map(({ id, value }) => ({ id, value })),
      });
      setAnimalsSaved(saved);
      setEditingAnimals(false);
      setError("");
    } catch (err) {
      setError(err.message);
    }
  }

  const totalSaved = animalsSaved.reduce((sum, a) => sum + a.value, 0);

  return (
    <main className="flex min-w-0 flex-1 flex-col gap-10 overflow-y-auto px-4 py-8 md:gap-12 md:px-8 md:py-10">

      {error && (
        <p
          role="alert"
          className="rounded-lg bg-danger/20 px-4 py-3 font-josefin text-[18px] font-semibold text-danger"
        >
          {error}
        </p>
      )}
      <section className="flex flex-col gap-6 md:gap-8">
        <SectionHeader
          title="Shelter Donations"
          as="h1"
          isEditing={editingCategories}
          onToggle={toggleCategories}
        />

        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3">
          {categories.map((c) => (
            <li
              key={c.id}
              className="flex flex-col gap-4 rounded-lg bg-magenta-500 p-6"
            >
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-display text-[24px] leading-[1.2] text-magenta-100 md:text-[28px]">
                  {c.name}
                </h3>
                <span className="shrink-0 font-josefin text-[16px] font-semibold text-magenta-100/80">
                  {c.goal > 0 ? Math.round((c.raised / c.goal) * 100) : 0}%
                </span>
              </div>

              {editingCategories ? (
                <div className="flex flex-wrap gap-2">
                  <AmountField
                    label="Raised"
                    value={c.raised}
                    onChange={(v) => updateCategory(c.id, "raised", v)}
                  />
                  <AmountField
                    label="Goal"
                    value={c.goal}
                    onChange={(v) => updateCategory(c.id, "goal", v)}
                  />
                </div>
              ) : (
                <p className="font-josefin text-[16px] font-semibold text-magenta-100">
                  R{c.raised.toLocaleString()} / R{c.goal.toLocaleString()}
                </p>
              )}

              <DonationBar raised={c.raised} goal={c.goal} />
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-6 md:gap-8">
        <SectionHeader
          title="Animals Saved"
          as="h2"
          isEditing={editingAnimals}
          onToggle={toggleAnimals}
        />

        <div className="flex flex-col items-center gap-8 rounded-lg bg-magenta-500 p-6 md:flex-row md:justify-center md:gap-16 md:p-8">
          <div className="h-[250px] w-full max-w-[400px]">
            <DonutChart
              labels={animalsSaved.map((a) => a.label)}
              values={animalsSaved.map((a) => a.value)}
              centreValue={String(totalSaved)}
              centreLabel="Total"
              legendPosition={editingAnimals ? "bottom" : "right"}
            />
          </div>

          {editingAnimals && (
            <div className="flex w-full max-w-[280px] flex-col gap-3">
              {animalsSaved.map((a) => (
                <label
                  key={a.id}
                  className="flex h-[42px] items-center justify-between gap-4 rounded-lg bg-pink-200 px-4 font-josefin text-[16px] font-semibold text-magenta-500"
                >
                  {a.label}
                  <input
                    type="number"
                    min="0"
                    value={a.value}
                    onChange={(e) => updateAnimal(a.id, e.target.value)}
                    title=""
                    className="w-20 bg-transparent text-right outline-none"
                  />
                </label>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function SectionHeader({ title, as: Heading, isEditing, onToggle }) {
  const size =
    Heading === "h1"
      ? "text-[48px] md:text-[64px] xl:text-[80px]"
      : "text-[36px] md:text-[43px]";

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <Heading
        className={`select-none font-display text-magenta-500 [text-box:trim-both_cap_alphabetic] ${size}`}
      >
        {title}
      </Heading>
      <button
        type="button"
        onClick={onToggle}
        className="h-14 w-full shrink-0 rounded-lg bg-magenta-400 font-josefin text-[20px] font-semibold text-magenta-100 drop-shadow-[0_4px_2px_#3b023d] transition-colors hover:bg-[#c92fcf] sm:w-[248px] md:h-16 md:text-[22px]"
      >
        {isEditing ? "Finish Editing" : "Edit"}
      </button>
    </div>
  );
}

function AmountField({ label, value, onChange }) {
  return (
    <label className="flex h-[42px] min-w-[140px] flex-1 items-center gap-2 rounded-lg bg-pink-200 px-4 font-josefin text-[15px] font-semibold whitespace-nowrap text-magenta-500">
      {label}: R
      <input
        type="number"
        min="0"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        title=""
        className="w-full min-w-0 bg-transparent outline-none"
      />
    </label>
  );
}
