const gradientPlugin = {
  beforeDraw: function (chart) {
    const ctx = chart.ctx;
    const xAxis = chart.scales["x-axis-0"];
    const yAxis = chart.scales["y-axis-0"];

    chart.data.datasets.forEach(function (dataset) {
      const meta = chart.getDatasetMeta(0);
      const elements = meta.data;

      for (let i = 0; i < elements.length - 1; i++) {
        const startX = elements[i]._model.x;
        const endX = elements[i + 1]._model.x;
        const gradient = ctx.createLinearGradient(startX, 0, endX, 0);

        // Задайте кольори градієнта, наприклад, від червоного до зеленого
        gradient.addColorStop(0, "rgba(255, 0, 0, 0.8)");
        gradient.addColorStop(1, "rgba(0, 255, 0, 0.8)");

        ctx.fillStyle = gradient;
        ctx.fillRect(
          startX,
          yAxis.top,
          endX - startX,
          yAxis.bottom - yAxis.top
        );
      }
    });
  },
};
const ctx = document.getElementById("myChart").getContext("2d");
ctx.canvas.style.backgroundColor = "white";

const gradient = ctx.createLinearGradient(
  0,
  0,
  ctx.canvas.width,
  ctx.canvas.height
);
gradient.addColorStop(0.29, "rgba(63, 81, 181, 1)");
gradient.addColorStop(0.63, "rgba(230, 75, 25, 1)");
gradient.addColorStop(0.75, "rgba(254, 160, 0, 1)");
gradient.addColorStop(1, "rgba(78, 175, 79, 1)");

const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];
const data = [17, 14, 15, 14.5, 15.3, 13.7, 10, 16, 14, 15.7, 15.6, 13.5];

const myLineChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: labels,
    datasets: [
      {
        label: "Rainbow Line Chart",
        data: data,
        borderColor: gradient,
        borderWidth: 8,
        borderCapStyle: "round",
        borderJoinStyle: "round",
        showLine: true,
        tension: 0.5,
      },
    ],
  },
  options: {
    scales: {
      x: [
        {
          afterBuildTicks: function (axis) {
            axis.ticks.forEach(function (tick, index) {
              // Вимикаємо відображення вертикальних ліній сітки для міток з пустим значенням
              if (labels[index] === "") {
                tick.major = false;
              }
            });
          },
          grid: {
            drawOnChartArea: false,
          },
        },
      ],
      y: {
        beginAtZero: true,
        display: false,
      },
    },

    plugins: {
      legend: {
        display: false,
      },
    },
    elements: {
      point: {
        radius: 0,
      },
    },
  },
});
