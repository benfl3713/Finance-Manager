import { Component, OnDestroy, OnInit } from '@angular/core';
import { StatisticsService } from 'src/app/Services/statistics.service';
import { PieChart } from '../../../Models/pie.chart';
import * as Chart from 'chart.js';
import 'chartjs-plugin-colorschemes';

@Component({
  selector: 'app-spent-per-category-chart',
  templateUrl: './spent-per-category-chart.component.html',
  styleUrls: ['./spent-per-category-chart.component.css'],
})
export class SpentPerCategoryChartComponent implements OnInit, OnDestroy {
  constructor(private statisticsService: StatisticsService) {}

  isMobile: boolean = true;
  hasLoaded: boolean = false;
  chart;

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.statisticsService.getSpentAmountPerCategory().subscribe({
      next: (data) => this.buildChart(data),
    });
  }

  buildChart(data: []): void {
    const chartConfig = new PieChart();

    const dataset = {
      fill: false,
      borderWidth: 4,
      data: Object.values(data),
    };
    chartConfig.data.datasets.push(dataset);
    chartConfig.data.labels = Object.keys(data);

    const spentPerCategoryChart = document.getElementById(
      'spentPerCategoryChart'
    ) as HTMLCanvasElement;

    this.chart = new Chart(spentPerCategoryChart.getContext('2d'), chartConfig);

    this.chart.options.responsive = this.chart.options.legend.display = this.chart.options.maintainAspectRatio = !this
      .isMobile;

    this.chart.options.title = {
      text: 'Spent Per Category',
      display: true,
    };

    this.chart.update();

    this.hasLoaded = true;
  }

  ngOnDestroy() {
    this.chart.destroy();
  }
}
