import { Doughnut } from "react-chartjs-2";

const BRAND_COLOURS = ["#951f99", "#f285b8", "#fedbff", "#6d0470", "#f8c2dc"];

const centreText = {
  id: "centreText",
  afterDraw(chart, _args, opts) {
    if (!opts.value && !opts.label) return;
    const { ctx, chartArea } = chart;
    const x = (chartArea.left + chartArea.right) / 2;
    const y = (chartArea.top + chartArea.bottom) / 2;

    ctx.save();
    ctx.textAlign = "center";
    ctx.fillStyle = "#fedbff";

    if (opts.value) {
      ctx.font = "40px 'Paytone One'";
      ctx.textBaseline = opts.label ? "bottom" : "middle";
      ctx.fillText(opts.value, x, opts.label ? y + 8 : y);
    }
    if (opts.label) {
      ctx.font = "600 16px 'Josefin Sans'";
      ctx.textBaseline = "top";
      ctx.fillText(opts.label, x, y + 12);
    }
    ctx.restore();
  },
};

export default function DonutChart({
  labels = [],
  values = [],
  colours = BRAND_COLOURS,
  centreLabel,
  centreValue,
  showLegend = true,
  legendPosition = "bottom",
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
      centreText: { value: centreValue, label: centreLabel },
      legend: {
        display: showLegend,
        position: legendPosition,
        labels: {
          color: "#fedbff",
          font: { family: "Josefin Sans", size: 20, weight: "600" },
          usePointStyle: true,
          pointStyle: "circle",
          padding: 32,
        },
      },
      tooltip: {
        backgroundColor: "#3b023d",
        titleFont: { family: "Josefin Sans", weight: "600" },
        bodyFont: { family: "Josefin Sans" },
        padding: 12,
        cornerRadius: 8,
      },
    },
  };

  return (
    <div className="size-full">
      <Doughnut data={data} options={options} plugins={[centreText]} />
    </div>
  );
}