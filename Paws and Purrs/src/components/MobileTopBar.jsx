import logo from "../assets/icons/navLogo.png";

export default function MobileTopBar({ onMenu }) {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between bg-magenta-400 px-4 drop-shadow-[0_0_7.5px_rgba(0,0,0,0.75)] lg:hidden">
      <img src={logo} alt="Paws & Purrs" className="h-10 w-auto" />
      <button
        type="button"
        onClick={onMenu}
        aria-label="Open menu"
        className="flex size-11 items-center justify-center rounded-lg text-magenta-100 transition-colors hover:bg-magenta-100/10"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" className="size-7 fill-none stroke-current stroke-[2.5]">
          <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
        </svg>
      </button>
    </header>
  );
}