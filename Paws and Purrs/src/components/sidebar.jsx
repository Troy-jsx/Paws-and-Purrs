import { useLocation, useNavigate } from "react-router-dom";
import DashboardButton from "./DashboardButton";
import DonateButton from "./DonateButton";
import AOTM from "./AOTMButton";
import AdoptionButton from "./AdoptionButton";
import ShelterDonationsButton from "./ShelterDonationsButton";
import logo from "../assets/icons/navLogo.png";
import { useAuth } from "../auth/AuthContext";

const adminItems = [
  { path: "/admin/dashboard", Button: DashboardButton },
  { path: "/admin/donate", Button: DonateButton },
  { path: "/admin/animal-of-the-month", Button: AOTM },
  { path: "/admin/adoption", Button: AdoptionButton },
  { path: "/admin/shelter-donations", Button: ShelterDonationsButton },
];

const donorItems = [
  { path: "/home", Button: DashboardButton },
  { path: "/donate", Button: DonateButton },
  { path: "/adopt", Button: AdoptionButton },
];

export default function Sidebar({ open = false, onClose }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { user } = useAuth();
  const items = user?.role === "admin" ? adminItems : donorItems;

  return (
    <>
      {open && (
        <div
          aria-hidden="true"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        />
      )}

      <nav
        className={`fixed inset-y-0 left-0 z-50 flex h-screen w-[280px] shrink-0 flex-col bg-bg-main drop-shadow-[0_0_7.5px_rgba(0,0,0,0.75)] select-none transition-transform duration-300 lg:static lg:translate-x-0 xl:w-[343px] ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex w-full items-center justify-center bg-magenta-400 py-12">
          <div className="h-[89px] w-[275px]">
            <img
              src={logo}
              alt="Paws & Purrs"
              className="size-full object-cover"
            />
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
    </>
  );
}
