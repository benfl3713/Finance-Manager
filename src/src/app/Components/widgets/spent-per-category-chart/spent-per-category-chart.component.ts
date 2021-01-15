import { Component, OnDestroy, OnInit } from '@angular/core';
import { StatisticsService } from 'src/app/Services/statistics.service';
import { PieChart } from '../../../Models/pie.chart';
import * as Chart from 'chart.js';
import 'chartjs-plugin-colorschemes';
import { MatDialog } from '@angular/material/dialog';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-spent-per-category-chart',
  templateUrl: './spent-per-category-chart.component.html',
  styleUrls: ['./spent-per-category-chart.component.css'],
})
export class SpentPerCategoryChartComponent implements OnInit, OnDestroy {
  constructor(
    private statisticsService: StatisticsService,
    private dialog: MatDialog,
    private currencyPipe: CurrencyPipe
  ) {}

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
      borderWidth: 2,
      data: Object.values(data),
    };
    chartConfig.data.datasets.push(dataset);
    chartConfig.data.labels = Object.keys(data);

    chartConfig.options.tooltips = {
      callbacks: {
        label: (tooltipItems, data) =>
          ` ${data.labels[tooltipItems.index]}   ${this.currencyPipe.transform(
            data.datasets[0].data[tooltipItems.index]
          )}`,
      },
    };

    const spentPerCategoryChart = document.getElementById(
      'spentPerCategoryChart'
    ) as HTMLCanvasElement;

    this.chart = new Chart(spentPerCategoryChart.getContext('2d'), chartConfig);

    // this.chart.options.responsive = this.chart.options.legend.display = this.chart.options.maintainAspectRatio = !this
    //   .isMobile;

    this.chart.options.maintainAspectRatio = false;
    this.chart.options.responsive = true;

    this.chart.update();

    this.hasLoaded = true;
  }

  ngOnDestroy() {
    this.chart.destroy();
  }
}
