import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  BaseChartDirective,
  provideCharts,
  withDefaultRegisterables,
} from 'ng2-charts';
import { Client, PowerWeatherDataOut } from '../api/api-reference';
import { ChartOptions, Plugin, Chart } from 'chart.js';
import { Toast, ToastrModule } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import 'chartjs-plugin-annotation';
import annotationPlugin from 'chartjs-plugin-annotation';

Chart.register(annotationPlugin);

@Component({
  selector: 'app-test',
  providers: [provideCharts(withDefaultRegisterables())],
  imports: [CommonModule, BaseChartDirective, ToastrModule],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss',
})
export class TestComponent implements OnInit {
  powerData: PowerWeatherDataOut = new PowerWeatherDataOut();
  id: number | undefined;
  @ViewChild(BaseChartDirective) chart!: BaseChartDirective;
  today = new Date();
  public tomorrowChartData: any;

  constructor(
    private client: Client,
    private tastr: ToastrModule,
    private route: ActivatedRoute
  ) {
    this.getTomorrowPower();
  }
  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.getTomorrowPower();
  }

  public chartPowerOptions: ChartOptions<'line'> | undefined = {
    responsive: true,
    plugins: {
      annotation: {
        annotations: {
          sunrise: {
            type: 'line',
            xMin: 0,
            xMax: 0,
            borderColor: 'orange',
            borderWidth: 3,
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
            borderColor: 'blue',
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
  };

  getTomorrowPower() {
    const tomorrow = new Date();
    tomorrow.setDate(this.today.getDate() + 1);
    this.client.getPowerWeather(tomorrow, 8).subscribe({
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

        this.chart?.update();

        this.tomorrowChartData = {
          labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
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
              borderColor: 'rgb(243, 101, 132)',
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
    });
  }
}
