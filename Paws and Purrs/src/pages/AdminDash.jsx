import SignOutButton from "../components/SignOutButton.jsx";
import AnimalsSavedCard from "../components/AnimalsSavedCard.jsx";
import AOTMCard from "../components/AOTMCard.jsx";
import AdoptionCard from "../components/AdoptionCard.jsx";
import lola from "../assets/adoption/lola.png";
import ShelterDonationsCard from "../components/ShelterDonationsCard.jsx";

function AdminDash() {
  return (
    <div className="bg-gradient flex-1 min-w-0 flex h-screen">
      <main className="flex min-w-0 flex-1 flex-col gap-8 overflow-y-auto px-4 py-8 md:gap-12 md:px-8 md:py-10">
        <div className="flex w-full flex-col-reverse items-start gap-6 sm:flex-row sm:justify-between sm:gap-8">
          <div className="flex max-w-[973px] flex-col gap-6 md:gap-8">
            <h1 className="select-none font-display text-[48px] text-magenta-500 [text-box:trim-both_cap_alphabetic] md:text-[64px] xl:text-[80px]">
              Hello Lexi
            </h1>
            <p className="select-none font-josefin text-[20px] font-medium leading-[120%] [text-box:trim-both_cap_alphabetic] md:text-[26px]">
              Welcome to Paws and Purrs Hub! Your central space to manage
              donations and update animal profiles!
            </p>
          </div>
          <div className="shrink-0 self-end sm:self-auto">
            <SignOutButton />
          </div>
        </div>

        <div className="flex w-full flex-col gap-6 xl:min-h-0 xl:flex-1">
          <div className="flex flex-col gap-6 xl:min-h-0 xl:flex-1 xl:flex-row">
            <div className="min-w-0 xl:flex-[3]">
              <AOTMCard
                name="Lola"
                sex="Female"
                age={3}
                description="Lola was found scared and alone, unsure of what the future held. After being rescued, she was given the love, care, and safety she desperately needed. Now, Lola is learning to trust, play, and enjoy the little things again."
                image={lola}
              />
            </div>
            <div className="min-w-0 xl:flex-[2]">
              <AnimalsSavedCard />
            </div>
          </div>

          <div className="flex flex-col gap-6 xl:min-h-0 xl:flex-1 xl:flex-row">
            <div className="min-w-0 xl:flex-[3]">
              <AdoptionCard className="h-full" />
            </div>
            <div className="min-w-0 xl:flex-[2]">
              <ShelterDonationsCard />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminDash;
