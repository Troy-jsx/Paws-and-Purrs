import { useLocation, useNavigate } from "react-router-dom";
import DashboardButton from "./DashboardButton";
import DonateButton from "./DonateButton";
import AOTM from "./AOTMButton";
import AdoptionButton from "./AdoptionButton";
import ShelterDonationsButton from "./ShelterDonationsButton";
import logo from "../assets/icons/navLogo.png";

const items = [
  { path: "/dashboard", Button: DashboardButton },
  { path: "/donate", Button: DonateButton },
  { path: "/animal-of-the-month", Button: AOTM },
  { path: "/adoption", Button: AdoptionButton },
  { path: "/shelter-donations", Button: ShelterDonationsButton },
];

export default function Sidebar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="hidden h-screen w-[280px] shrink-0 flex-col bg-bg-main drop-shadow-[0_0_7.5px_rgba(0,0,0,0.75)] select-none lg:flex xl:w-[343px]">
      <div className="flex w-full items-center justify-center bg-magenta-400 py-12">
        <div className="h-[89px] w-[275px]">
          <img src={logo} alt="Paws & Purrs" className="size-full object-cover" />
        </div>
      </div>

      <div className="flex w-full flex-col">
        {items.map(({ path, Button }) => (
          <Button
            key={path}
            active={pathname.startsWith(path)}
            px="px-5"
            textSize="text-[24px]"
            onClick={() => navigate(path)}
          />
        ))}
      </div>
    </nav>
  );
}