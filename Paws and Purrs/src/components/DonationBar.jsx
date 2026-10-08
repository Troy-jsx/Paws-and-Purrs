import { Bar } from "react-chartjs-2";

export default function DonationBar({ raised, goal, colour = "#f285b8" }) {
  const data = {
    labels: [""],
    datasets: [
      {
        data: [raised],
        backgroundColor: colour,
        hoverBackgroundColor: "#fedbff",
        borderRadius: 8,
        borderSkipped: false,
        barPercentage: 1,
        categoryPercentage: 1,
      },
    ],
  };

  const options = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    layout: { padding: 0 },
    scales: {
      x: { display: false, min: 0, max: goal },
      y: { display: false },
    },
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
  };

   const percent = Math.round((raised / goal) * 100);

  return (
    <div className="group/bar relative w-full">
      <div className="h-2 w-full overflow-hidden rounded-lg bg-magenta-100/15">
        <Bar data={data} options={options} />
      </div>

      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-[#3b023d] p-3 font-josefin text-[14px] font-semibold text-magenta-100 opacity-0 transition-opacity group-hover/bar:opacity-100"
      >
        {percent}%
      </span>
    </div>
  );
}