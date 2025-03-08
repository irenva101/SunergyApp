import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Client } from '../../api/api-reference';
import { ToastrService } from 'ngx-toastr';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { ChartOptions } from 'chart.js';

@Component({
  selector: 'app-solar-panel',
  providers: [provideCharts(withDefaultRegisterables())],
  imports: [BaseChartDirective],
  templateUrl: './solar-panel.component.html',
  styleUrl: './solar-panel.component.scss',
})
export class SolarPanelComponent {
  constructor(
    private route: ActivatedRoute,
    private client: Client,
    private toastr: ToastrService
  ) {}
  id: number | undefined;
  data: any;
  //public chart: Chart | undefined;
  public chartData: any = {
    labels: [
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
    ],
    datasets: [
      {
        label: 'Snaga (kW)',
        data: [
          0, 1, 2, 1.5, 2.5, 3, 3.5, 4, 5, 6, 5.5, 4.5, 4, 3, 2.5, 2, 1.8, 1.7,
          1.5, 1.3, 1.1, 1.0, 1.2, 1.5,
        ],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: false,
        yAxisID: 'y',
      },
      {
        label: 'Temperatura (°C)',
        data: [
          15, 16, 15, 14, 14, 13, 13, 14, 16, 18, 20, 22, 24, 26, 28, 29, 30,
          29, 28, 26, 24, 21, 18, 16,
        ],
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: false,
        yAxisID: 'y2',
      },
      {
        label: 'Oblačnost (%)',
        data: [
          80, 85, 90, 92, 95, 97, 100, 100, 95, 90, 85, 80, 75, 70, 65, 60, 55,
          60, 65, 70, 75, 80, 85, 90,
        ],
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        fill: false,
        yAxisID: 'y2',
      },
    ],
  };

  public chartOptions: ChartOptions<'line'> = {
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

  //#region Oninit setup
  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    //this.createChart();
    // this.setForcastWeather();
    // this.setHistoryWeather();
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

  createChart() {
    // const data = {
    //   labels: [
    //     '00h',
    //     '01h',
    //     '02h',
    //     '03h',
    //     '04h',
    //     '05h',
    //     '06h',
    //     '07h',
    //     '08h',
    //     '09h',
    //     '10h',
    //     '11h',
    //     '12h',
    //     '13h',
    //     '14h',
    //     '15h',
    //     '16h',
    //     '17h',
    //     '18h',
    //     '19h',
    //     '20h',
    //     '21h',
    //     '22h',
    //     '23h',
    //   ],
    //   datasets: [
    //     {
    //       label: 'Snaga (kW)',
    //       data: [
    //         0, 1, 2, 1.5, 2.5, 3, 3.5, 4, 5, 6, 5.5, 4.5, 4, 3, 2.5, 2, 1.8,
    //         1.7, 1.5, 1.3, 1.1, 1.0, 1.2, 1.5,
    //       ],
    //       borderColor: 'rgba(75, 192, 192, 1)',
    //       backgroundColor: 'rgba(75, 192, 192, 0.2)',
    //       fill: false,
    //       yAxisID: 'y',
    //     },
    //     {
    //       label: 'Temperatura (°C)',
    //       data: [
    //         15, 16, 15, 14, 14, 13, 13, 14, 16, 18, 20, 22, 24, 26, 28, 29, 30,
    //         29, 28, 26, 24, 21, 18, 16,
    //       ],
    //       borderColor: 'rgba(255, 99, 132, 1)',
    //       backgroundColor: 'rgba(255, 99, 132, 0.2)',
    //       fill: false,
    //       yAxisID: 'y2',
    //     },
    //     {
    //       label: 'Oblačnost (%)',
    //       data: [
    //         80, 85, 90, 92, 95, 97, 100, 100, 95, 90, 85, 80, 75, 70, 65, 60,
    //         55, 60, 65, 70, 75, 80, 85, 90,
    //       ],
    //       borderColor: 'rgba(153, 102, 255, 1)',
    //       backgroundColor: 'rgba(153, 102, 255, 0.2)',
    //       fill: false,
    //       yAxisID: 'y2',
    //     },
    //   ],
    // };
    // const options: ChartConfiguration<'line'>['options'] = {
    //   responsive: true,
    //   scales: {
    //     x: {
    //       title: {
    //         display: true,
    //         text: 'Sati',
    //       },
    //     },
    //     y: {
    //       type: 'linear',
    //       position: 'left',
    //       title: {
    //         display: true,
    //         text: 'Snaga (kW)',
    //       },
    //       beginAtZero: true,
    //     },
    //     y2: {
    //       type: 'linear',
    //       position: 'right',
    //       title: {
    //         display: true,
    //         text: 'Temperatura (°C) i Oblačnost (%)',
    //       },
    //       beginAtZero: true,
    //     },
    //   },
    // };
    // this.chart = new Chart('weatherChart', {
    //   type: 'line',
    //   data: data,
    //   options: options,
    // });
  }
}
