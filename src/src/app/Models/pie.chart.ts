export class PieChart {
  type = 'pie';
  data = {
    labels: [],
    datasets: [],
  };
  options = {
    responsive: true,
    plugins: {
      colorschemes: {
        scheme: 'brewer.Dark2-7',
      },
    },
    tooltips: {},
  };
}
