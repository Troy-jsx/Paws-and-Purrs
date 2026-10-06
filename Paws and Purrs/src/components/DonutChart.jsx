import { Doughnut } from "react-chartjs-2";

const BRAND_COLOURS = ["#951f99", "#f285b8", "#fedbff", "#6d0470", "#f8c2dc"];

export default function DonutChart({
  labels = [],
  values = [],
  colours = BRAND_COLOURS,
  centreLabel,
  centreValue,
  showLegend = true,
}) {
  const data = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: colours,
        borderWidth: 0,
        hoverOffset: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "70%",
    plugins: {
      legend: {
        display: showLegend,
        position: "bottom",
        labels: {
          color: "#fedbff",
          font: { family: "Josefin Sans", size: 16, weight: "600" },
          usePointStyle: true,
          pointStyle: "circle",
          padding: 16,
        },
      },
      tooltip: {
        backgroundColor: "#3b023d",
        titleFont: { family: "Josefin Sans", weight: "600" },
        bodyFont: { family: "Josefin Sans" },
        padding: 16,
        cornerRadius: 8,
      },
    },
  };

  return (
    <div className="relative size-full">
      <Doughnut data={data} options={options} />

      {(centreValue || centreLabel) && (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center pb-12">
          {centreValue && (
            <span className="font-display text-[64px] leading-none text-magenta-100">{centreValue}</span>
          )}
          {centreLabel && (
            <span className="font-josefin text-[16px] font-semibold text-magenta-100">{centreLabel}</span>
          )}
        </div>
      )}
    </div>
  );
}