import { useEffect, useState } from "react";
import { api } from "../../api";
import { useAuth } from "../../auth/AuthContext";

export default function DonorAdopt() {
  const { user } = useAuth();
  const [animals, setAnimals] = useState([]);
  const [requestingId, setRequestingId] = useState(null);
  const [adopted, setAdopted] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api("/animals")
      .then(setAnimals)
      .catch((err) => setError(err.message));
  }, []);

  useEffect(() => {
    if (!adopted) return;
    const onKey = (e) => e.key === "Escape" && setAdopted(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [adopted]);

  async function handleAdopt(animal) {
    setError("");
    setRequestingId(animal.id);
    try {
      await api("/adoption-requests", {
        method: "POST",
        body: { animalId: animal.id },
      });
      setAdopted(animal);
    } catch (err) {
      setError(err.message);
    } finally {
      setRequestingId(null);
    }
  }

  return (
    <main className="flex min-w-0 flex-1 flex-col gap-8 overflow-y-auto px-4 py-8 md:gap-12 md:px-8 md:py-10">
      <div className="flex flex-col gap-6 md:gap-8">
        <h1 className="select-none font-display text-[48px] text-magenta-500 [text-box:trim-both_cap_alphabetic] md:text-[64px] xl:text-[80px]">
          Adoption
        </h1>
        <p className="max-w-[760px] select-none font-josefin text-[20px] font-medium leading-[120%] [text-box:trim-both_cap_alphabetic] md:text-[26px]">
          Meet the animals waiting for their forever homes. Found the one? Start
          your adoption journey.
        </p>
      </div>

      {error && (
        <p
          role="alert"
          className="rounded-lg bg-danger/20 px-4 py-3 font-josefin text-[18px] font-semibold text-danger"
        >
          {error}
        </p>
      )}

      {animals.length > 0 ? (
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3">
          {animals.map((animal) => (
            <li key={animal.id}>
              <article className="flex h-full flex-col gap-4 rounded-lg bg-magenta-500 p-4">
                <div className="h-[240px] overflow-hidden rounded-lg bg-[#4d4d4d]">
                  {animal.image && (
                    <img
                      src={animal.image}
                      alt={animal.name}
                      className="size-full object-cover"
                    />
                  )}
                </div>
                <h2 className="font-display text-[28px] leading-[1.2] text-magenta-100 md:text-[32px]">
                  {animal.name}
                </h2>
                <div className="flex flex-wrap gap-2">
                  <Badge>{animal.gender}</Badge>
                  <Badge>Estimated Age: {animal.age}</Badge>
                </div>
                <p className="line-clamp-4 font-josefin text-[18px] font-semibold leading-[1.2] text-magenta-100">
                  {animal.description}
                </p>
                <button
                  type="button"
                  onClick={() => handleAdopt(animal)}
                  disabled={requestingId !== null}
                  className="mt-auto h-14 rounded-lg bg-magenta-400 font-josefin text-[20px] font-semibold text-magenta-100 drop-shadow-[0_4px_2px_#3b023d] transition-colors hover:bg-[#c92fcf] disabled:opacity-60"
                >
                  {requestingId === animal.id
                    ? "Please wait..."
                    : `Adopt ${animal.name}`}
                </button>
              </article>
            </li>
          ))}
        </ul>
      ) : (
        !error && (
          <p className="rounded-lg bg-magenta-500 p-6 font-josefin text-[18px] font-semibold text-magenta-100">
            No animals listed right now. Check back soon.
          </p>
        )
      )}

      {adopted && (
        <AdoptedModal
          animal={adopted}
          email={user?.email}
          onClose={() => setAdopted(null)}
        />
      )}
    </main>
  );
}

function AdoptedModal({ animal, email, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="adopted-title"
        onClick={(e) => e.stopPropagation()}
        className="flex w-full max-w-[520px] flex-col gap-6 rounded-lg bg-magenta-500 p-6 text-center drop-shadow-[0_0_7.5px_rgba(0,0,0,0.75)] md:p-10"
      >
        {animal.image && (
          <img
            src={animal.image}
            alt=""
            className="mx-auto size-32 rounded-full object-cover ring-4 ring-pink-base"
          />
        )}
        <h2
          id="adopted-title"
          className="font-display text-[32px] leading-[1.2] text-magenta-100 md:text-[40px]"
        >
          Your adoption journey starts here!
        </h2>
        <p className="font-josefin text-[18px] font-semibold leading-[1.3] text-magenta-100/90 md:text-[20px]">
          Thank you for choosing {animal.name}. We'll email our adoption form to{" "}
          <span className="text-pink-base">{email}</span> shortly.
        </p>
        <button
          type="button"
          onClick={onClose}
          autoFocus
          className="h-14 rounded-lg bg-pink-base font-josefin text-[20px] font-semibold text-magenta-500 transition-colors hover:bg-pink-200"
        >
          Done
        </button>
      </div>
    </div>
  );
}

function Badge({ children }) {
  return (
    <span className="flex h-[30px] min-w-[100px] flex-1 items-center justify-center rounded-lg bg-pink-200 px-4 font-josefin text-[15px] font-medium whitespace-nowrap text-magenta-500">
      {children}
    </span>
  );
}
