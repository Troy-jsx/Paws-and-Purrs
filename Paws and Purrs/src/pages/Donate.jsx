import { useEffect, useState } from "react";
import DonationCard from "../components/DonationCard.jsx";

const PERIODS = [
  { value: "today", label: "Today" },
  { value: "week", label: "This Week" },
  { value: "month", label: "This Month" },
];

async function fetchDonations(period) {
  return [
    { id: 1, name: "Thandi Mokoena", email: "thandi.m@gmail.com", phone: "082 456 7890", category: "Food" },
    { id: 2, name: "James van der Merwe", email: "jamesvdm@outlook.com", phone: "071 234 5678", category: "Medical Care" },
    { id: 3, name: "Aisha Patel", email: "aisha.patel@gmail.com", phone: "083 987 6543", category: "Shelter Upkeep" },
  ];
}

export default function Donate() {
  const [period, setPeriod] = useState("today");
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    fetchDonations(period).then(setDonations);
  }, [period]);

  return (
    <main className="flex min-w-0 flex-1 flex-col gap-8 overflow-y-auto px-4 py-8 md:gap-12 md:px-8 md:py-10">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <h1 className="select-none font-display text-[48px] text-magenta-500 [text-box:trim-both_cap_alphabetic] md:text-[64px] xl:text-[80px]">
          Donations
        </h1>
        <PeriodSelect value={period} onChange={setPeriod} />
      </div>

      {donations.length > 0 ? (
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 2xl:grid-cols-3">
          {donations.map((donation) => (
            <li key={donation.id}>
              <DonationCard {...donation} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="rounded-lg bg-magenta-500 p-8 text-center font-josefin text-[20px] font-semibold text-magenta-100">
          No donations for this period yet.
        </p>
      )}
    </main>
  );
}

function PeriodSelect({ value, onChange }) {
  return (
    <label className="relative w-full sm:w-[248px]">
      <span className="sr-only">Show donations from</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-16 w-full cursor-pointer appearance-none rounded-lg bg-magenta-500 pl-6 pr-14 font-josefin text-[22px] font-semibold text-magenta-100 drop-shadow-[0_0_7.5px_rgba(0,0,0,0.75)] outline-none transition-colors hover:bg-[#6d0470] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-magenta-500"
      >
        {PERIODS.map((p) => (
          <option key={p.value} value={p.value} className="bg-magenta-500 text-magenta-100">
            {p.label}
          </option>
        ))}
      </select>
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="pointer-events-none absolute right-5 top-1/2 size-6 -translate-y-1/2 fill-none stroke-magenta-100 stroke-[2.5]"
      >
        <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </label>
  );
}