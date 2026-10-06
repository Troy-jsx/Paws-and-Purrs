export default function AOTMCard({ name, sex, age, description, image }) {
  return (
    <div className="group relative flex min-w-[523px] flex-col gap-8 rounded-lg bg-magenta-500 p-8 drop-shadow-[0_0_7.5px_rgba(0,0,0,0.75)] transition-[filter] hover:drop-shadow-none">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-lg bg-linear-to-b from-magenta-500 to-[#6d0470] opacity-0 transition-opacity group-hover:opacity-100"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-lg opacity-0 shadow-[inset_0_0_22.1px_0_rgba(0,0,0,0.75)] transition-opacity group-hover:opacity-100"
      />

      <h2 className="relative font-display text-[43px] leading-[52px] text-magenta-100 [text-box:trim-both_cap_alphabetic]">
        Animal Of The Month
      </h2>

      <div className="relative flex items-start gap-6">
        <div className="h-[255px] w-[230px] shrink-0 overflow-hidden rounded-lg bg-[#d3d3d3]">
          {image && <img src={image} alt={name} className="size-full object-cover" />}
        </div>

        <div className="flex h-[255px] min-w-0 flex-1 flex-col justify-center gap-7">
          <div className="flex flex-col gap-6">
            <p className="font-display text-[40px] leading-[38px] text-magenta-100 [text-box:trim-both_cap_alphabetic]">
              {name}
            </p>
            <div className="flex gap-2">
              <Badge>{sex}</Badge>
              <Badge>Estimated Age: {age}</Badge>
            </div>
          </div>

          <p className="line-clamp-4 text-justify font-josefin text-[20px] font-semibold leading-[1.2] text-white [text-box:trim-start_cap_alphabetic]">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

function Badge({ children }) {
  return (
    <div className="flex h-9 min-w-[46px] flex-1 items-center justify-center rounded-lg bg-pink-200 px-4 py-2">
      <span className="text-center font-josefin text-[20px] font-semibold leading-[1.2] tracking-[-0.4px] text-magenta-500 [text-box:trim-both_cap_alphabetic]">
        {children}
      </span>
    </div>
  );
}