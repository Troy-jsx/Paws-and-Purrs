import Sidebar from "../components/Sidebar.jsx";
import SignOutButton from "../components/SignOutButton.jsx";
import AnimalsSavedCard from "../components/AnimalsSavedCard.jsx";
import AOTMCard from "../components/AOTMCard.jsx";

function AdminDash() {
  return (
    <div className="bg-gradient h-screen flex flex-row">
      <Sidebar />
      <div className="flex flex-col gap-12 px-8 py-16 w-full">
        <div className="w-full justify-between flex flex-row items-start gap-8">
          <div className="flex flex-col max-w-[973px] gap-8 h-auto">
            <h1 className="[text-box:trim-both_cap_alphabetic] text-[80px] select-none font-display text-magenta-500">
              Hello Lexi
            </h1>
            <p className="[text-box:trim-both_cap_alphabetic] font-josefin select-none font-medium text-[26px] leading-[120%]">
              Welcome to Paws and Purrs Hub! Your central space to manage
              donations and update animal profiles!
            </p>
          </div>
          <div className="shrink-0">
            <SignOutButton />
          </div>
        </div>
        <div className="w-full flex flex-col gap-4">
          <div className="flex flex-row gap-6">
            <AOTMCard
              name="Lola"
              sex="Female"
              age={3}
              description="Lola was found scared and alone, unsure of what the future held. After being rescued, she was given the love, care, and safety she desperately needed. Now, Lola is learning to trust, play, and enjoy the little things again."
              // image={lola}
            />
            <AnimalsSavedCard />
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default AdminDash;
