export default function NavButton({
  label,
  icon,
  hoverIcon,
  active = false,
  px = "px-8",
  textSize = "text-[22px]",
  onClick,
}) {
  const stateClasses = active
    ? "bg-magenta-500 text-pink-100"
    : "bg-bg-main text-pink-100 hover:bg-pink-base hover:text-magenta-500";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={`group flex h-22 w-[343px] items-center gap-4 ${px} py-4 text-left transition-colors ${stateClasses}`}
    >
      <span className="relative size-7 shrink-0 px-6 translate-y-[-2px]">
        {icon && (
          <img
            src={icon}
            alt=""
            className={`absolute inset-0 size-full transition-opacity ${!active && hoverIcon ? "group-hover:opacity-0" : ""}`}
          />
        )}
        {hoverIcon && !active && (
          <img
            src={hoverIcon}
            alt=""
            className="absolute inset-0 size-full opacity-0 transition-opacity group-hover:opacity-100"
          />
        )}
      </span>
      <span className={`flex-1 whitespace-nowrap font-josefin ${textSize} font-semibold leading-[1.2] [text-box:trim-both_cap_alphabetic]`}>
        {label}
      </span>
    </button>
  );
}