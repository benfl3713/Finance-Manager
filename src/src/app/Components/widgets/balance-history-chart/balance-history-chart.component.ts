import { Component, OnDestroy, OnInit } from '@angular/core';
import { LineChart } from '../../../Models/line.chart';
import * as Chart from 'chart.js';
import 'chartjs-plugin-colorschemes';
import 'chartjs-plugin-zoom';
import { StatisticsService } from 'src/app/Services/statistics.service';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { DeviceDetectorService } from 'ngx-device-detector';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-balance-history-chart',
  templateUrl: './balance-history-chart.component.html',
  styleUrls: ['./balance-history-chart.component.css'],
})
export class BalanceHistoryChartComponent implements OnInit, OnDestroy {
  constructor(
    private statisticsService: StatisticsService,
    private datePipe: DatePipe,
    private deviceService: DeviceDetectorService,
    private currencyPipe: CurrencyPipe
  ) {}

  chart;
  hasLoaded: boolean = false;
  isMobile: boolean = this.deviceService.isMobile();
  dateRange = new FormControl('year');
  dateRangeSub: Subscription;

  ngOnInit(): void {
    this.loadData();
    this.dateRangeSub = this.dateRange.valueChanges.subscribe(() =>
      this.loadData()
    );
  }

  loadData() {
    this.hasLoaded = false;
    this.chart?.destroy();
    let dateFrom = new Date();
    switch (this.dateRange.value) {
      case 'halfYear':
        dateFrom.setMonth(dateFrom.getMonth() - 6);
        break;
      case 'month':
        dateFrom.setMonth(dateFrom.getMonth() - 1);
        break;
      case 'week':
        dateFrom.setDate(dateFrom.getDate() - 7);
        break;
      default:
        dateFrom.setFullYear(dateFrom.getFullYear() - 1);
        break;
    }
    this.statisticsService.getBalanceHistory(dateFrom).subscribe({
      next: (data) => this.buildChart(data),
    });
  }

  buildChart(data: any[]) {
    const chartConfig = new LineChart();

    chartConfig.options.elements = {
      point: {
        radius: 0,
      },
    };

    const dateFrom = this.dateRange.value;
    chartConfig.options.scales.xAxes[0].time.unit =
      dateFrom == 'week' || dateFrom == 'month' ? 'day' : 'month';

    chartConfig.options.scales.yAxes = [
      {
        ticks: {
          beginAtZero: true,
          callback: (value) => this.currencyPipe.transform(value),
        },
      },
    ];

    chartConfig.options.tooltips.callbacks = {
      label: (tooltipItems, data) =>
        ` ${
          data.datasets[tooltipItems.datasetIndex].label
        }  ${this.currencyPipe.transform(tooltipItems.yLabel.toString())}`,
    };

    Object.values(data).forEach((accountData) => {
      const dataset = {
        fill: false,
        borderWidth: 4,
        data: Object.values(accountData.History),
        label: accountData.AccountName,
      };
      chartConfig.data.datasets.push(dataset);
    });

    const systemStatisticsChart = document.getElementById(
      'balanceHistoryChart'
    ) as HTMLCanvasElement;
    this.chart = new Chart(systemStatisticsChart.getContext('2d'), chartConfig);

    if (Object.values(data).length > 0) {
      chartConfig.data.labels = Object.keys(
        Object.values(data)[0].History
      ).map((d) => this.datePipe.transform(d, 'yyyy-MM-dd'));
    }

    this.chart.options.responsive = this.chart.options.legend.display = this.chart.options.maintainAspectRatio = !this
      .isMobile;

    this.chart.options.responsive = true;
    this.chart.options.maintainAspectRatio = false;

    this.chart.update();

    this.hasLoaded = true;
  }

  ngOnDestroy() {
    // Destory chart when component is destroyed
    this.chart.destroy();
    this.dateRangeSub.unsubscribe();
  }
}
