import DonationBar from "./DonationBar.jsx";

const defaultShelters = [
  { name: "Food", raised: 18500, goal: 25000 },
  { name: "Medical Care", raised: 12000, goal: 20000 },
  { name: "Shelter Upkeep", raised: 9000, goal: 15000 },
  { name: "Toys & Bedding", raised: 4200, goal: 6000 },
  { name: "Transport", raised: 2500, goal: 8000 },
];

export default function ShelterDonationsCard({ shelters = defaultShelters }) {
  return (
    <div className="@container group relative flex h-full w-full flex-col gap-6 rounded-lg bg-magenta-500 p-6 drop-shadow-[0_0_7.5px_rgba(0,0,0,0.75)] transition-[filter] hover:drop-shadow-none md:gap-8 md:p-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-lg bg-linear-to-b from-magenta-500 to-[#6d0470] opacity-0 transition-opacity group-hover:opacity-100"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-lg opacity-0 shadow-[inset_0_0_22.1px_0_rgba(0,0,0,0.75)] transition-opacity group-hover:opacity-100"
      />

      <h2 className="relative font-display text-[32px] leading-[1.2] text-magenta-100 [text-box:trim-both_cap_alphabetic] xl:text-[44px] xl:leading-[52px]">
        Shelter Donations
      </h2>

      <ul className="relative flex flex-1 flex-col justify-center gap-2">
        {shelters.map(({ name, raised, goal }) => (
          <li key={name} className="flex flex-col gap-1">
            <div className="flex items-baseline justify-between gap-4 font-josefin text-[16px] font-semibold text-magenta-100">
              <span>{name}</span>
              <span className="text-magenta-100/80">
                R{raised.toLocaleString()} / R{goal.toLocaleString()}
              </span>
            </div>
            <DonationBar raised={raised} goal={goal} />
          </li>
        ))}
      </ul>
    </div>
  );
}
