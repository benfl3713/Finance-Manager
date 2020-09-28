import { Component, OnDestroy, OnInit } from '@angular/core';
import { LineChart } from '../../../Models/line.chart';
import * as Chart from 'chart.js';
import 'chartjs-plugin-colorschemes';
import 'chartjs-plugin-zoom';
import { StatisticsService } from 'src/app/Services/statistics.service';
import { DatePipe } from '@angular/common';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-balance-history-chart',
  templateUrl: './balance-history-chart.component.html',
  styleUrls: ['./balance-history-chart.component.css'],
})
export class BalanceHistoryChartComponent implements OnInit, OnDestroy {
  constructor(
    private statisticsService: StatisticsService,
    private datePipe: DatePipe,
    private deviceService: DeviceDetectorService
  ) {}

  chart;
  hasLoaded: boolean = false;
  isMobile: boolean = this.deviceService.isMobile();

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.statisticsService.getBalanceHistory().subscribe({
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

    Object.values(data).forEach((accountData) => {
      const dataset = {
        fill: false,
        borderWidth: 4,
        data: Object.values(accountData.History),
        label: accountData.AccountName,
      };
      chartConfig.data.datasets.push(dataset);
    });

    const systemStatisticsChart = <HTMLCanvasElement>(
      document.getElementById('balanceHistoryChart')
    );
    this.chart = new Chart(systemStatisticsChart.getContext('2d'), chartConfig);

    if (Object.values(data).length > 0) {
      chartConfig.data.labels = Object.keys(
        Object.values(data)[0].History
      ).map((d) => this.datePipe.transform(d, 'yyyy-MM-dd'));
    }

    this.chart.options.responsive = this.chart.options.legend.display = this.chart.options.maintainAspectRatio = !this
      .isMobile;

    this.chart.update();

    this.hasLoaded = true;
  }

  ngOnDestroy() {
    // Destory chart when component is destroyed
    this.chart.destroy();
  }
}
