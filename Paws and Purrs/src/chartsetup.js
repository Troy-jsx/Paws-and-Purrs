import {
  Chart as ChartJS,
  CategoryScale,  // x-axis labels
  LinearScale,    // y-axis numbers
  BarElement,     // bar charts
  LineElement,    // line charts
  PointElement,   // dots on line charts
  ArcElement,     // pie / doughnut charts
  Filler,         // filled area under a line
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Filler,
  Tooltip,
  Legend
);

ChartJS.defaults.font.family = "Josefin Sans";
ChartJS.defaults.color = "#fedbff";