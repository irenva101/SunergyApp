import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  Client,
  PowerWeatherDataOut,
  ProfitWeatherDataOut,
} from '../../api/api-reference';
import { ToastrService } from 'ngx-toastr';
import {
  BaseChartDirective,
  provideCharts,
  withDefaultRegisterables,
} from 'ng2-charts';
import { Chart, ChartOptions, Plugin } from 'chart.js';
import { CommonModule, DecimalPipe } from '@angular/common';
import 'chartjs-plugin-annotation';
import 'chartjs-adapter-date-fns';
import annotationPlugin from 'chartjs-plugin-annotation';

Chart.register(annotationPlugin);

@Component({
  selector: 'app-solar-panel',
  providers: [provideCharts(withDefaultRegisterables()), CommonModule],
  imports: [BaseChartDirective, DecimalPipe],
  templateUrl: './solar-panel.component.html',
  styleUrl: './solar-panel.component.scss',
})
export class SolarPanelComponent {
  id: number | undefined;
  data: any;
  powerData: PowerWeatherDataOut = new PowerWeatherDataOut();
  profitData: ProfitWeatherDataOut = new ProfitWeatherDataOut();
  today = new Date();

  @ViewChild(BaseChartDirective) chart!: BaseChartDirective;

  currentTemp: number | undefined;
  currentCloudnes: number | undefined;
  generatedPowerSum: number | undefined;
  currentPower: number | undefined;
  currentPrice: number | undefined;
  profitSum: number | undefined;

  public todayChartData: any;
  public yesterdayChartData: any;
  public tomorrowChartData: any;
  public chartPowerOptions: ChartOptions<'line'> | undefined = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Sati',
        },
        min: 0,
        max: 23,
      },
      y: {
        type: 'linear',
        position: 'left',
        title: {
          display: true,
          text: 'Snaga (kW)',
        },
        beginAtZero: true,
      },
      y2: {
        type: 'linear',
        position: 'right',
        title: {
          display: true,
          text: 'Temperatura (°C) i Oblačnost (%)',
        },
        beginAtZero: true,
      },
    },
    plugins: {
      annotation: {
        annotations: {
          sunrise: {
            type: 'line',
            xMin: 0,
            xMax: 0,
            borderColor: 'orange',
            borderWidth: 1,
            label: {
              content: 'Sunrise',
              display: true,
              position: 'start',
            },
          },
          sunset: {
            type: 'line',
            xMin: 0,
            xMax: 0,
            borderColor: 'orange',
            borderWidth: 1,
            label: {
              content: 'Sunset',
              display: true,
              position: 'start',
            },
          },
        },
      },
    },
  };

  public todayProfitData: any;
  public yesterdayProfitData: any;
  public tomorrowProfitData: any;
  public chartProfitOptions: ChartOptions<'line'> | undefined = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Sati',
        },
        min: 0,
        max: 23,
      },
      y: {
        type: 'linear',
        position: 'left',
        title: {
          display: true,
          text: 'Snaga (W)',
        },
        beginAtZero: true,
      },
      y2: {
        type: 'linear',
        position: 'right',
        title: {
          display: true,
          text: 'Cena (EUR) i Profit (EUR)',
        },
        beginAtZero: true,
      },
    },
    plugins: {
      annotation: {
        annotations: {
          sunrise: {
            type: 'line',
            xMin: 0,
            xMax: 0,
            borderColor: 'orange',
            borderWidth: 1,
            label: {
              content: 'Sunrise',
              display: true,
              position: 'start',
            },
          },
          sunset: {
            type: 'line',
            xMin: 0,
            xMax: 0,
            borderColor: 'orange',
            borderWidth: 1,
            label: {
              content: 'Sunset',
              display: true,
              position: 'start',
            },
          },
        },
      },
    },
  };

  //#region csv dowload
  downloadCSV(csvContent: string) {
    const BOM = '\uFEFF'; // UTF-8 BOM karakter
    const contentWithBOM = BOM + csvContent;
    const blob = new Blob([contentWithBOM], {
      type: 'text/csv;charset=utf-8;',
    });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'data.csv';
    link.click();
  }

  generateCSV(data: any) {
    let csvContent =
      'Sat,' +
      data.datasets.map((dataset: { label: any }) => dataset.label).join(',') +
      '\n';
    const rows = data.labels.map((label: any, index: string | number) => {
      const power = data.datasets[0].data[index] ?? 0;
      const price = data.datasets[1].data[index] ?? 0;
      const profit = data.datasets[2].data[index] ?? 0;

      return [label, power, price, profit].join(',');
    });

    csvContent += rows.join('\n');

    this.downloadCSV(csvContent);
  }
  //#endregion

  //#region power
  getYesterdayPower() {
    const yesterday = new Date();
    yesterday.setDate(this.today.getDate() - 1);
    this.client.getPowerWeather(yesterday, this.id).subscribe({
      next: (result) => {
        this.powerData = result.data!;

        const sunriseTime = result.data?.sunrise?.getHours();
        const sunsetTime = result.data?.sunset?.getHours();

        if (this.chartPowerOptions?.plugins?.annotation?.annotations) {
          const annotations = this.chartPowerOptions.plugins.annotation
            .annotations as Record<string, any>;

          annotations['sunrise'].xMin = sunriseTime;
          annotations['sunrise'].xMax = sunriseTime;
          annotations['sunset'].xMin = sunsetTime;
          annotations['sunset'].xMax = sunsetTime;
        }

        this.yesterdayChartData = {
          labels: Array.from({ length: 24 }, (_, i) => `${i}h`),
          datasets: [
            {
              label: 'Snaga (kW)',
              data: this.powerData.powers,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              fill: false,
              yAxisID: 'y',
            },
            {
              label: 'Temperatura (°C)',
              data: this.powerData.temperatures,
              borderColor: 'rgba(255, 99, 132, 1)',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              fill: false,
              yAxisID: 'y2',
            },
            {
              label: 'Oblačnost (%)',
              data: this.powerData.clouds,
              borderColor: 'rgba(153, 102, 255, 1)',
              backgroundColor: 'rgba(153, 102, 255, 0.2)',
              fill: false,
              yAxisID: 'y2',
            },
          ],
        };
      },
      error: (err) => {
        this.toastr.error(err);
      },
    });
  }

  getTodayPower() {
    this.client.getPowerWeather(this.today, this.id).subscribe({
      next: (result) => {
        this.powerData = result.data!;

        const sunriseTime = result.data?.sunrise?.getHours();
        const sunsetTime = result.data?.sunset?.getHours();

        if (this.chartPowerOptions?.plugins?.annotation?.annotations) {
          const annotations = this.chartPowerOptions.plugins.annotation
            .annotations as Record<string, any>;

          annotations['sunrise'].xMin = sunriseTime;
          annotations['sunrise'].xMax = sunriseTime;
          annotations['sunset'].xMin = sunsetTime;
          annotations['sunset'].xMax = sunsetTime;
        }

        this.todayChartData = {
          labels: Array.from({ length: 24 }, (_, i) => `${i}h`),
          datasets: [
            {
              label: 'Snaga (kW)',
              data: this.powerData.powers,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(16, 30, 30, 0.2)',
              fill: false,
              yAxisID: 'y',
            },
            {
              label: 'Temperatura (°C)',
              data: this.powerData.temperatures,
              borderColor: 'rgba(255, 99, 132, 1)',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              fill: false,
              yAxisID: 'y2',
            },
            {
              label: 'Oblačnost (%)',
              data: this.powerData.clouds,
              borderColor: 'rgba(153, 102, 255, 1)',
              backgroundColor: 'rgba(153, 102, 255, 0.2)',
              fill: false,
              yAxisID: 'y2',
            },
          ],
        };


      },
      error: (err) => {
        this.toastr.error(err);
      },
    });
  }

  getTomorrowPower() {
    const tomorrow = new Date();
    tomorrow.setDate(this.today.getDate() + 1);
    this.client.getPowerWeather(tomorrow, this.id).subscribe({
      next: (result) => {
        this.powerData = result.data!;

        const sunriseTime = result.data?.sunrise?.getHours();
        const sunsetTime = result.data?.sunset?.getHours();

        if (this.chartPowerOptions?.plugins?.annotation?.annotations) {
          const annotations = this.chartPowerOptions.plugins.annotation
            .annotations as Record<string, any>;

          annotations['sunrise'].xMin = sunriseTime;
          annotations['sunrise'].xMax = sunriseTime;
          annotations['sunset'].xMin = sunsetTime;
          annotations['sunset'].xMax = sunsetTime;
        }

        this.tomorrowChartData = {
          labels: Array.from({ length: 24 }, (_, i) => `${i}h`),
          datasets: [
            {
              label: 'Snaga (kW)',
              data: this.powerData.powers,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              fill: false,
              yAxisID: 'y',
            },
            {
              label: 'Temperatura (°C)',
              data: this.powerData.temperatures,
              borderColor: 'rgba(255, 99, 132, 1)',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              fill: false,
              yAxisID: 'y2',
            },
            {
              label: 'Oblačnost (%)',
              data: this.powerData.clouds,
              borderColor: 'rgba(153, 102, 255, 1)',
              backgroundColor: 'rgba(153, 102, 255, 0.2)',
              fill: false,
              yAxisID: 'y2',
            },
          ],
        };
      },
      error: (err) => {
        this.toastr.error(err);
      },
    });
  }
  
  //#endregion

  //#region profit
  getYesterdayProfit() {
    const yesterday = new Date();
    yesterday.setDate(this.today.getDate() - 1);
    this.client.getProfitWeather(yesterday, this.id).subscribe({
      next: (result) => {
        this.profitData = result.data!;

        const sunriseTime = result.data?.sunrise?.getHours();
        const sunsetTime = result.data?.sunset?.getHours();

        if (this.chartProfitOptions?.plugins?.annotation?.annotations) {
          const annotations = this.chartProfitOptions.plugins.annotation
            .annotations as Record<string, any>;

          annotations['sunrise'].xMin = sunriseTime;
          annotations['sunrise'].xMax = sunriseTime;
          annotations['sunset'].xMin = sunsetTime;
          annotations['sunset'].xMax = sunsetTime;
        }

        this.yesterdayProfitData = {
          labels: Array.from({ length: 24 }, (_, i) => `${i}h`),
          datasets: [
            {
              label: 'Snaga (W)',
              data: this.profitData.powers,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              fill: false,
              yAxisID: 'y',
            },
            {
              label: 'Cena (EUR)',
              data: this.profitData.prices,
              borderColor: 'rgba(255, 99, 132, 1)',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              fill: false,
              yAxisID: 'y2',
            },
            {
              label: 'Profit (EUR)',
              data: this.profitData.profit,
              borderColor: 'rgba(153, 102, 255, 1)',
              backgroundColor: 'rgba(153, 102, 255, 0.2)',
              fill: false,
              yAxisID: 'y2',
            },
          ],
        };
      },
      error: (err) => {
        this.toastr.error(err);
      },
    });
  }

  getTodayProfit() {
    this.client.getProfitWeather(this.today, this.id).subscribe({
      next: (result) => {
        this.profitData = result.data!;

        const sunriseTime = result.data?.sunrise?.getHours();
        const sunsetTime = result.data?.sunset?.getHours();

        if (this.chartProfitOptions?.plugins?.annotation?.annotations) {
          const annotations = this.chartProfitOptions.plugins.annotation
            .annotations as Record<string, any>;

          annotations['sunrise'].xMin = sunriseTime;
          annotations['sunrise'].xMax = sunriseTime;
          annotations['sunset'].xMin = sunsetTime;
          annotations['sunset'].xMax = sunsetTime;
        }

        this.todayProfitData = {
          labels: Array.from({ length: 24 }, (_, i) => `${i}h`),
          datasets: [
            {
              label: 'Snaga (kW)',
              data: this.profitData.powers,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              fill: false,
              yAxisID: 'y',
            },
            {
              label: 'Cena (EUR)',
              data: this.profitData.prices,
              borderColor: 'rgba(255, 99, 132, 1)',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              fill: false,
              yAxisID: 'y2',
            },
            {
              label: 'Profit (EUR)',
              data: this.profitData.profit,
              borderColor: 'rgba(153, 102, 255, 1)',
              backgroundColor: 'rgba(153, 102, 255, 0.2)',
              fill: false,
              yAxisID: 'y2',
            },
          ],
        };
      },
      error: (err) => {
        this.toastr.error(err);
      },
    });
  }

  getTomorrowProfit() {
    const tomorrow = new Date();
    tomorrow.setDate(this.today.getDate() + 1);
    this.client.getProfitWeather(tomorrow, this.id).subscribe({
      next: (result) => {
        this.profitData = result.data!;

        const sunriseTime = result.data?.sunrise?.getHours();
        const sunsetTime = result.data?.sunset?.getHours();

        if (this.chartProfitOptions?.plugins?.annotation?.annotations) {
          const annotations = this.chartProfitOptions.plugins.annotation
            .annotations as Record<string, any>;

          annotations['sunrise'].xMin = sunriseTime;
          annotations['sunrise'].xMax = sunriseTime;
          annotations['sunset'].xMin = sunsetTime;
          annotations['sunset'].xMax = sunsetTime;
        }

        this.tomorrowProfitData = {
          labels: Array.from({ length: 24 }, (_, i) => `${i}h`),
          datasets: [
            {
              label: 'Snaga (kW)',
              data: this.profitData.powers,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              fill: false,
              yAxisID: 'y',
            },
            {
              label: 'Cena (EUR)',
              data: this.profitData.prices,
              borderColor: 'rgba(255, 99, 132, 1)',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              fill: false,
              yAxisID: 'y2',
            },
            {
              label: 'Profit (EUR)',
              data: this.profitData.profit,
              borderColor: 'rgba(153, 102, 255, 1)',
              backgroundColor: 'rgba(153, 102, 255, 0.2)',
              fill: false,
              yAxisID: 'y2',
            },
          ],
        };
      },
      error: (err) => {
        this.toastr.error(err);
      },
    });
  }
  //#endregion

  //#region constructor
  constructor(
    private route: ActivatedRoute,
    private client: Client,
    private toastr: ToastrService
  ) {}
  //#endregion

  //#region Oninit setup
  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    // this.setForcastWeather();
    // this.setHistoryWeather();

    this.getCurrentTemp();
    this.getCurrentCloudnes();
    this.getGeneratedPowerSum();

    this.getCurrentPower();
    this.getCurrentPrice();
    this.getProfitSum();

    this.getYesterdayPower();
    this.getTodayPower();
    this.getTomorrowPower();
    this.getYesterdayProfit();
    this.getTodayProfit();
    this.getTomorrowProfit();
  }
  //#endregion

  //#region MainPower
  getCurrentTemp() {
    this.client.getCurrentTemp().subscribe({
      next: (response) => {
        this.currentTemp = response.data;
      },
      error: (err) => {
        this.toastr.error(err);
      },
    });
  }

  getCurrentCloudnes() {
    this.client.getCurrentClouds().subscribe({
      next: (response) => {
        this.currentCloudnes = response.data;
      },
      error: (err) => {
        this.toastr.error(err);
      },
    });
  }

  getGeneratedPowerSum() {
    this.client.getGeneratedPowerSum().subscribe({
      next: (response) => {
        this.generatedPowerSum = response.data;
      },
      error: (err) => {
        this.toastr.error(err);
      },
    });
  }

  //#endregion

  //#region MainProfit
  getCurrentPower() {
    this.client.getCurrentPower().subscribe({
      next: (response) => {
        this.currentPower = response.data;
      },
      error: (err) => {
        this.toastr.error(err);
      },
    });
  }

  getCurrentPrice() {
    this.client.getCurrentPrice().subscribe({
      next: (response) => {
        this.currentPrice = response.data;
      },
      error: (err) => {
        this.toastr.error(err);
      },
    });
  }

  getProfitSum() {
    this.client.getGeneratedProfitSum().subscribe({
      next: (response) => {
        this.profitSum = response.data;
      },
      error: (err) => {
        this.toastr.error(err);
      },
    });
  }
  //#endregion

  //#region DB setup
  setForcastWeather() {
    this.client.setForecastWeather(this.id).subscribe({
      next: (result) => {
        this.toastr.success(result.message);
      },
      error: (err) => {
        this.toastr.error(err);
              },
    });
  }

  setHistoryWeather() {
    this.client.setHistoryWeather(this.id).subscribe({
      next: (result) => {
        this.toastr.success(result.message);
      },
      error: (err) => {
        this.toastr.error(err);
      },
    });
  }
  //#endregion
}
