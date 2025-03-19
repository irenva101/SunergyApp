import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  BaseChartDirective,
  provideCharts,
  withDefaultRegisterables,
} from 'ng2-charts';
import { Client, PowerWeatherDataOut } from '../api/api-reference';
import { ChartOptions, Plugin } from 'chart.js';
import { Toast, ToastrModule } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import 'chartjs-plugin-annotation';
import Annotation from 'chartjs-plugin-annotation';

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

  timeLabels = Array.from({ length: 24 }, (_, i) => {
    const date = new Date(1970, 0, 1); // 1. januar 1970. godine
    date.setHours(i, 0, 0, 0); // Postavi sate (00:00, 01:00, ... 23:00)
    return date.getTime(); // Pretvori u timestamp
  });

  public chartPowerOptions: ChartOptions<'line'> | undefined = {
    responsive: true,
    plugins: {
      annotation: {
        annotations: {
          line1: {
            type: 'label',
            xValue: 2.5,
            yValue: 60,
            backgroundColor: 'rgba(432,245,245)',
            content: ['This is my text', 'This is my text, second line'],
            font: {
              size: 18,
            },
          },
          line2: {
            type: 'label',
            xValue: 2.5,
            yValue: 60,
            backgroundColor: 'rgba(245,245,245)',
            content: ['This is my text', 'This is my text, second line'],
            font: {
              size: 18,
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
        type: 'time',
        time: {
          unit: 'hour',
          tooltipFormat: 'HH:mm',
          displayFormats: {
            hour: 'HH:mm',
          },
        },
        min: this.timeLabels[0],
        max: this.timeLabels[this.timeLabels.length - 1],
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

  public plugIn: Plugin<'line'>[] = [
    {
      id: 'verticalLine1',
      beforeDraw: (chart) => {
        const ctx = chart.ctx;
        const xPosition = chart.scales['x'].getPixelForValue(
          5
        ); // Promeni na odgovarajuću vrednost
        ctx.beginPath();
        ctx.moveTo(xPosition, chart.chartArea.top);
        ctx.lineTo(xPosition, chart.chartArea.bottom);
        ctx.strokeStyle = 'orange'; // Boja linije
        ctx.lineWidth = 1; // Debljina linije
        ctx.stroke();

        // Dodaj labelu "Sunrise"
        ctx.font = 'bold 12px Arial'; // Stil fonta
        ctx.fillStyle = 'orange'; // Boja teksta
        ctx.textAlign = 'center'; // Poravnanje teksta
        ctx.fillText('Sunrise', xPosition, chart.chartArea.top +10); // Postavljanje iznad grafika
      },
    },
    {
      id: 'verticalLine2',
      beforeDraw: (chart) => {
        const ctx = chart.ctx;
        const xPosition = chart.scales['x'].getPixelForValue(
          17
        ); // Promeni na odgovarajuću vrednost
        ctx.beginPath();
        ctx.moveTo(xPosition, chart.chartArea.top);
        ctx.lineTo(xPosition, chart.chartArea.bottom);
        ctx.strokeStyle = 'orange'; // Boja linije
        ctx.lineWidth = 1; // Debljina linije
        ctx.stroke();

        // Dodaj labelu "Sunset"
        ctx.font = 'bold 12px Arial'; // Stil fonta
        ctx.fillStyle = 'orange'; // Boja teksta
        ctx.textAlign = 'center'; // Poravnanje teksta
        ctx.fillText('Sunset', xPosition, chart.chartArea.top + 10); // Postavljanje iznad grafika
      },
    },
  ];

  getTomorrowPower() {
    const tomorrow = new Date();
    tomorrow.setDate(this.today.getDate() + 1);
    this.client.getPowerWeather(tomorrow, 8).subscribe({
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
