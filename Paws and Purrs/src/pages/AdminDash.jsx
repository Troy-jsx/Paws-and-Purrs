import SignOutButton from "../components/SignOutButton.jsx";
import AnimalsSavedCard from "../components/AnimalsSavedCard.jsx";
import AOTMCard from "../components/AOTMCard.jsx";
import AdoptionCard from "../components/AdoptionCard.jsx";
import ShelterDonationsCard from "../components/ShelterDonationsCard.jsx";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { useEffect, useState } from "react";
import { api } from "../api";

function AdminDash() {
  const { user } = useAuth();
  const isDonor = user?.role === "donor";
  const firstName = user?.name?.split(" ")[0] ?? "";

  const [aotm, setAotm] = useState(null);
  const [categories, setCategories] = useState([]);
  const [stats, setStats] = useState([]);
  const [animals, setAnimals] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([
      api("/animal-of-the-month"),
      api("/categories"),
      api("/animal-stats"),
      api("/animals"),
    ])
      .then(([aotmData, categoryData, statData, animalData]) => {
        setAotm(aotmData);
        setCategories(categoryData);
        setStats(statData);
        setAnimals(animalData);
      })
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="flex min-h-0 min-w-0 flex-1">
      <main className="flex min-w-0 flex-1 flex-col gap-8 overflow-y-auto px-4 py-8 md:gap-12 md:px-8 md:py-10">
        <div className="flex w-full flex-col-reverse items-start gap-6 sm:flex-row sm:justify-between sm:gap-8">
          <div className="flex max-w-[973px] flex-col gap-6 md:gap-8">
            <h1 className="select-none font-display text-[48px] text-magenta-500 [text-box:trim-both_cap_alphabetic] md:text-[64px] xl:text-[80px]">
              Hello {firstName}
            </h1>
            <p className="select-none font-josefin text-[20px] font-medium leading-[120%] [text-box:trim-both_cap_alphabetic] md:text-[26px]">
              {isDonor
                ? "Welcome to Paws and Purrs Hub! See where your support goes and help every pet find a forever home."
                : "Welcome to Paws and Purrs Hub! Your central space to manage donations and update animal profiles!"}
            </p>
          </div>

          <div className="flex shrink-0 gap-4 self-end sm:self-auto">
            {isDonor && (
              <Link
                to="/donate"
                className="flex h-16 w-62 items-center justify-center rounded-lg bg-pink-base px-4 py-2 font-josefin text-[22px] font-semibold text-magenta-500 drop-shadow-[0_0_7.5px_rgba(0,0,0,0.75)] transition-colors hover:bg-pink-200"
              >
                <span className="[text-box:trim-both_cap_alphabetic]">
                  Donate
                </span>
              </Link>
            )}
            <SignOutButton />
          </div>
        </div>
        {error && (
          <p
            role="alert"
            className="rounded-lg bg-danger/20 px-4 py-3 font-josefin text-[18px] font-semibold text-danger"
          >
            {error}
          </p>
        )}
        <div className="flex w-full flex-col gap-6 2xl:min-h-0 2xl:flex-1">
          <div className="flex flex-col gap-6 2xl:min-h-[400px] 2xl:flex-1 2xl:flex-row">
            <div className="min-w-0 2xl:flex-[3]">
              {aotm?.name ? (
                <AOTMCard
                  name={aotm.name}
                  sex={aotm.gender}
                  age={aotm.age}
                  description={aotm.description}
                  image={aotm.image}
                />
              ) : (
                <div className="flex h-full min-h-[200px] items-center justify-center rounded-lg bg-magenta-500 p-8 text-center font-josefin text-[20px] font-semibold text-magenta-100">
                  No Animal of the Month has been chosen yet.
                </div>
              )}
            </div>
            <div className="min-w-0 2xl:flex-[2]">
              <AnimalsSavedCard stats={stats} />
            </div>
          </div>

          <div className="flex flex-col gap-6 2xl:min-h-[400px] 2xl:flex-1 2xl:flex-row">
            <div className="min-w-0 2xl:flex-[3]">
              <AdoptionCard
                className="h-full"
                {...(animals.length > 0 && {
                  animals: animals
                    .slice(0, 4)
                    .map((a) => ({ src: a.image, alt: a.name })),
                })}
              />
            </div>
            <div className="min-w-0 2xl:flex-[2]">
              <ShelterDonationsCard shelters={categories} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminDash;
