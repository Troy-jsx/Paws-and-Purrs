import DonutChart from "./DonutChart.jsx";

export default function AnimalsSavedCard() {
  return (
    <div className="group relative flex h-full w-full flex-col gap-6 rounded-lg bg-magenta-500 p-6 drop-shadow-[0_0_7.5px_rgba(0,0,0,0.75)] transition-[filter] hover:drop-shadow-none md:gap-8 md:p-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-lg bg-linear-to-b from-magenta-500 to-[#6d0470] opacity-0 transition-opacity group-hover:opacity-100"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-lg opacity-0 shadow-[inset_0_0_22.1px_0_rgba(0,0,0,0.75)] transition-opacity group-hover:opacity-100"
      />

      <h2 className="relative font-display text-[32px] leading-[1.2] text-magenta-100 [text-box:trim-both_cap_alphabetic] md:text-[43px] md:leading-[52px]">
        Animals Saved
      </h2>

      <div className="relative flex flex-1 items-center justify-center">
        <div className="h-[250px] w-full max-w-[320px]">
          <DonutChart
            labels={["Dogs", "Cats", "Other"]}
            values={[40, 30, 30]}
            centreValue="67"
            centreLabel="Total"
            legendPosition="right"
          />
        </div>
      </div>
    </div>
  );
}