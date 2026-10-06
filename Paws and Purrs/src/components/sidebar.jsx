import { useState } from "react";
import DashboardButton from "./DashboardButton";
import DonateButton from "./DonateButton";
import AOTM from "./AOTMButton";
import AdoptionButton from "./AdoptionButton";
import ShelterDonationsButton from "./ShelterDonationsButton";
import logo from "../assets/icons/navLogo.png";

const items = [
  { id: "dashboard", Button: DashboardButton },
  { id: "donate", Button: DonateButton },
  { id: "aotm", Button: AOTM },
  { id: "adoption", Button: AdoptionButton },
  { id: "shelter-donations", Button: ShelterDonationsButton },
];

export default function Sidebar() {
  const [activeId, setActiveId] = useState("dashboard");

  return (
    <nav className="hidden h-screen w-[280px] shrink-0 flex-col bg-bg-main drop-shadow-[0_0_7.5px_rgba(0,0,0,0.75)] select-none lg:flex xl:w-[343px]">
      <div className="flex w-full items-center justify-center bg-magenta-400 py-12">
        <div className="h-[89px] w-[275px]">
          { <img src={logo} alt="Paws & Purrs" className="size-full object-cover" />}
        </div>
      </div>

      <div className="flex w-full flex-col">
        {items.map(({ id, Button }) => (
          <Button
            key={id}
            active={activeId === id}
            px="px-5"
            textSize="text-[24px]"
            onClick={() => setActiveId(id)}
          />
        ))}
      </div>
    </nav>
  );
}
