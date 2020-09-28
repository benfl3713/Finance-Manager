export class LineChart {
  type = 'line';
  data = {
    labels: [],
    datasets: [],
  };
  options: any = {
    scales: {
      xAxes: [
        {
          type: 'time',
          time: {
            unit: 'month',
          },
        },
      ],
    },
    responsive: true,
    plugins: {
      colorschemes: { scheme: 'brewer.Dark2-8' },
      zoom: {
        zoom: {
          enabled: true,
          mode: 'x',
        },
      },
    },
    tooltips: {
      intersect: false,
      mode: 'index',
    },
  };
}
