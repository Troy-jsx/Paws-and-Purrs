import { useEffect, useState } from "react";
import DonationCard from "../components/DonationCard.jsx";
import { api } from "../api";

const PERIODS = [
  { value: "today", label: "Today" },
  { value: "week", label: "This Week" },
  { value: "month", label: "This Month" },
];

function fetchDonations(period) {
  return api(`/donations?period=${period}`);
}

export default function Donate() {
  const [period, setPeriod] = useState("today");
  const [donations, setDonations] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDonations(period)
      .then((data) => {
        setDonations(data);
        setError("");
      })
      .catch((err) => setError(err.message));
  }, [period]);

  async function markPaid(id) {
    try {
      const updated = await api(`/donations/${id}/paid`, { method: "PATCH" });
      setDonations((list) => list.map((d) => (d.id === id ? updated : d)));
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main className="flex min-w-0 flex-1 flex-col gap-8 overflow-y-auto px-4 py-8 md:gap-12 md:px-8 md:py-10">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <h1 className="select-none font-display text-[48px] text-magenta-500 [text-box:trim-both_cap_alphabetic] md:text-[64px] xl:text-[80px]">
          Donations
        </h1>
        <PeriodSelect value={period} onChange={setPeriod} />
      </div>
      {error && (
        <p
          role="alert"
          className="rounded-lg bg-danger/20 px-4 py-3 font-josefin text-[18px] font-semibold text-danger"
        >
          {error}
        </p>
      )}
      {donations.length > 0 ? (
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 2xl:grid-cols-3">
          {donations.map((donation) => (
            <li key={donation.id}>
              <DonationCard
                name={donation.name}
                email={donation.email}
                phone={donation.phone}
                category={donation.categoryName}
                amount={donation.amount}
                reference={donation.reference}
                status={donation.status}
                anonymous={donation.anonymous}
                onMarkPaid={() => markPaid(donation.id)}
              />
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
          <option
            key={p.value}
            value={p.value}
            className="bg-magenta-500 text-magenta-100"
          >
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
