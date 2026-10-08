import gingerCat from "../assets/adoption/ginger-cat.png";
import greyhound from "../assets/adoption/greyhound.png";
import blackPitbull from "../assets/adoption/black-pitbull.png";
import goldenRetriever from "../assets/adoption/golden-retriever.png";

const defaultAnimals = [
  { src: gingerCat, alt: "Ginger cat" },
  { src: greyhound, alt: "Greyhound" },
  { src: blackPitbull, alt: "Black pitbull puppy" },
  { src: goldenRetriever, alt: "Golden retriever" },
];

export default function AdoptionCard({
  title = "Adoption",
  subtitle = "Meet loving animals waiting for their forever homes!",
  animals = defaultAnimals,
  onClick,
  className = "",
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative isolate flex w-full flex-col items-start justify-center gap-10 overflow-hidden rounded-lg bg-[#3b023d] p-8 text-left drop-shadow-[0_0_7.5px_rgba(0,0,0,0.75)] transition-[filter] duration-300 ease-out hover:drop-shadow-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#fedbff] ${className}`}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit] bg-gradient-to-b from-[#3b023d] to-[#6d0470] opacity-0 shadow-[inset_0_0_22.1px_0_rgba(0,0,0,0.75)] transition-opacity duration-300 ease-out group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none"
      />

      <div className="flex w-full flex-col gap-6 text-[#fedbff]">
        <h2 className="font-['Paytone_One'] text-[43px] leading-[52px] [text-box:trim-both_cap_alphabetic]">
          {title}
        </h2>
        <p className="font-['Josefin_Sans'] text-[20px] font-semibold leading-[1.2] [text-box:trim-both_cap_alphabetic]">
          {subtitle}
        </p>
      </div>

      <ul className="flex items-center">
        {animals.map(({ src, alt }, i) => (
          <li
            key={alt}
            className={`relative size-40 shrink-0 overflow-hidden rounded-full bg-white ${i < animals.length - 1 ? "-mr-[55px]" : ""}`}
          >
            <img src={src} alt={alt} className="size-full object-cover" />
          </li>
        ))}
      </ul>
    </button>
  );
}
