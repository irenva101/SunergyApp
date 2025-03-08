import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Client, PowerWeatherDataOut, ProfitWeatherDataOut } from '../../api/api-reference';
import { ToastrService } from 'ngx-toastr';
import {
  BaseChartDirective,
  provideCharts,
  withDefaultRegisterables,
} from 'ng2-charts';
import { ChartOptions } from 'chart.js';

@Component({
  selector: 'app-solar-panel',
  providers: [provideCharts(withDefaultRegisterables())],
  imports: [BaseChartDirective],
  templateUrl: './solar-panel.component.html',
  styleUrl: './solar-panel.component.scss',
})
export class SolarPanelComponent {
  id: number | undefined;
  data: any;
  powerData: PowerWeatherDataOut = new PowerWeatherDataOut();
  profitData: ProfitWeatherDataOut = new ProfitWeatherDataOut();
  today = new Date();

  timeLabels = [
    '00h',
    '01h',
    '02h',
    '03h',
    '04h',
    '05h',
    '06h',
    '07h',
    '08h',
    '09h',
    '10h',
    '11h',
    '12h',
    '13h',
    '14h',
    '15h',
    '16h',
    '17h',
    '18h',
    '19h',
    '20h',
    '21h',
    '22h',
    '23h',
  ];

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
  };

  getYesterdayPower() {
    const yesterday = new Date();
    yesterday.setDate(this.today.getDate() - 1);
    this.client.getPowerWeather(yesterday).subscribe({
      next: (result) => {
        this.powerData = result.data!;

        this.yesterdayChartData = {
          labels: this.timeLabels,
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
    this.client.getPowerWeather(this.today).subscribe({
      next: (result) => {
        this.powerData = result.data!;

        this.todayChartData = {
          labels: this.timeLabels,
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

  getTomorrowPower() {
    const tomorrow = new Date();
    tomorrow.setDate(this.today.getDate() + 1);
    this.client.getPowerWeather(tomorrow).subscribe({
      next: (result) => {
        this.powerData = result.data!;

        this.tomorrowChartData = {
          labels: this.timeLabels,
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

  getYesterdayProfit(){
    const yesterday = new Date();
    yesterday.setDate(this.today.getDate() - 1);
    this.client.getProfitWeather(yesterday).subscribe({
      next: (result) => {
        this.profitData = result.data!;

        this.yesterdayProfitData = {
          labels: this.timeLabels,
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

  getTodayProfit(){
    this.client.getProfitWeather(this.today).subscribe({
      next: (result) => {
        this.profitData = result.data!;

        this.todayProfitData = {
          labels: this.timeLabels,
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

  getTomorrowProfit(){
    const tomorrow = new Date();
    tomorrow.setDate(this.today.getDate() + 1);
    this.client.getProfitWeather(tomorrow).subscribe({
      next: (result) => {
        this.profitData = result.data!;

        this.tomorrowProfitData = {
          labels: this.timeLabels,
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
    //this.setForcastWeather();
    //this.setHistoryWeather();
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
