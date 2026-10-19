import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import logo from "../assets/icons/navLogo.png";

const links = [
  { to: "/home", label: "Home" },
  { to: "/donate", label: "Donate" },
];

export default function DonorLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="bg-gradient flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 flex items-center justify-between gap-4 bg-magenta-400 px-4 py-3 drop-shadow-[0_0_7.5px_rgba(0,0,0,0.75)] md:px-8">
        <img src={logo} alt="Paws & Purrs" className="h-10 w-auto md:h-12" />

        <nav className="flex items-center gap-1 md:gap-2">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 font-josefin text-[16px] font-semibold transition-colors md:px-4 md:text-[20px] ${
                  isActive ? "bg-magenta-500 text-magenta-100" : "text-magenta-100 hover:bg-magenta-100/10"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
          <button
            type="button"
            onClick={() => {
              logout();
              navigate("/");
            }}
            className="ml-1 rounded-lg bg-pink-base px-3 py-2 font-josefin text-[16px] font-semibold text-magenta-500 transition-colors hover:bg-pink-200 md:ml-2 md:px-4 md:text-[20px]"
          >
            Sign Out
          </button>
        </nav>
      </header>

      <Outlet />
    </div>
  );
}