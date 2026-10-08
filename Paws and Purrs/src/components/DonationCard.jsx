export default function DonationCard({ name, email, phone, category, date }) {
  const formattedDate = new Date(date).toLocaleDateString("en-ZA", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <article className="group relative flex h-full flex-col gap-6 rounded-lg bg-magenta-500 p-6 drop-shadow-[0_0_7.5px_rgba(0,0,0,0.75)] transition-[filter] hover:drop-shadow-none md:p-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-lg bg-linear-to-b from-magenta-500 to-[#6d0470] opacity-0 transition-opacity group-hover:opacity-100"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-lg opacity-0 shadow-[inset_0_0_22.1px_0_rgba(0,0,0,0.75)] transition-opacity group-hover:opacity-100"
      />

      <div className="relative flex items-start justify-between gap-4">
        <h2 className="min-w-0 font-display text-[28px] leading-[1.2] text-magenta-100 md:text-[32px]">
          {name}
        </h2>
        <span className="shrink-0 rounded-lg bg-pink-200 px-4 py-2 font-josefin text-[16px] font-semibold text-magenta-500">
          {category}
        </span>
      </div>

      <dl className="relative flex flex-col gap-3 font-josefin text-[18px] font-semibold">
        <Detail label="Email">
          <a href={`mailto:${email}`} className="break-all text-white hover:text-pink-base">
            {email}
          </a>
        </Detail>
        <Detail label="Phone">
          <a href={`tel:${phone.replace(/\s/g, "")}`} className="text-white hover:text-pink-base">
            {phone}
          </a>
        </Detail>
        <Detail label="Date">
          <span className="text-white">{formattedDate}</span>
        </Detail>
      </dl>
    </article>
  );
}

function Detail({ label, children }) {
  return (
    <div className="flex gap-4">
      <dt className="w-16 shrink-0 text-magenta-100/70">{label}</dt>
      <dd className="min-w-0">{children}</dd>
    </div>
  );
}