import { useNavigate } from "react-router-dom";

export default function SignOutButton({ onClick }) {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate('/')}
      className="cursor-pointer flex h-16 w-62 items-center justify-center rounded-lg bg-bg-main px-4 py-2 font-josefin text-[22px] font-semibold leading-[1.2] whitespace-nowrap text-pink-100 drop-shadow-[0_0_3px_rgba(0,0,0,0.25)] transition-colors hover:bg-pink-base hover:text-magenta-500"
    >
      <span className="[text-box:trim-both_cap_alphabetic]">Sign Out</span>
    </button>
  );
}