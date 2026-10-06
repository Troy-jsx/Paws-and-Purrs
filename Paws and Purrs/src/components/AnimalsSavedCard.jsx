import DonutChart from "./DonutChart.jsx";

export default function AnimalsSavedCard() {
  return (
    <div className="group relative flex w-full flex-col gap-8 rounded-lg bg-magenta-500 p-8 drop-shadow-[0_0_7.5px_rgba(0,0,0,0.75)] transition-[filter] hover:drop-shadow-none">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-lg bg-linear-to-b from-magenta-500 to-[#6d0470] opacity-0 transition-opacity group-hover:opacity-100"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-lg opacity-0 shadow-[inset_0_0_22.1px_0_rgba(0,0,0,0.75)] transition-opacity group-hover:opacity-100"
      />

      <h2 className="relative font-display text-[43px] leading-[52px] text-magenta-100 [text-box:trim-both_cap_alphabetic]">
        Animals Saved
      </h2>

      <div className="relative flex items-center justify-center">
        <div className="h-[320px] w-[320px]">
          <DonutChart
            labels={["Dogs", "Cats", "Other"]}
            values={[40, 30, 30]}
            centreValue="67"
            centreLabel="Total"
          />
        </div>
      </div>
    </div>
  );
}