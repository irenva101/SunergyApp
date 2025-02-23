import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as L from 'leaflet';
import { Client, PanelDto } from '../../api/api-reference';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-map',
  imports: [CommonModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent implements OnInit {
  private map: L.Map | undefined;
  private centroid: L.LatLngExpression = [45.2671, 19.8335]; //
  panels: PanelDto[] = [];
  selectedPanel: PanelDto | null = null;
  clicked: boolean = false;

  constructor(
    private router: Router,
    private client: Client,
    private toster: ToastrService
  ) {}

  private initMap(): void {
    this.map = L.map('map', {
      center: this.centroid,
      zoom: 13,
    });

    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        minZoom: 1,
        maxZoom: 18,
      }
    );
    tiles.addTo(this.map);

    this.map.on('click', (event: L.LeafletMouseEvent) => {
      if (this.selectedPanel) {
        console.log('NE');
        const lat = parseFloat(event.latlng.lat.toFixed(4));
        const lng = parseFloat(event.latlng.lng.toFixed(4));
        this.router.navigate(['/panel-setup'], {
          queryParams: { lat: lat, lng: lng },
        });
      }
    });
  }

  ngOnInit(): void {
    this.initMap();
    this.getAllPanels();
  }

  getAllPanels() {
    this.client.getAllPanelsByUserId().subscribe({
      next: (response) => {
        this.panels = response.data!;

        // Kreiranje custom ikone za solarni panel
        const solarIcon = L.icon({
          iconUrl: 'solar-panel.svg', // Putanja do tvoje ikone
          iconSize: [32, 32], // Dimenzije ikone
          iconAnchor: [16, 32], // Prilagoditi tačku koju ikona označava
          popupAnchor: [0, -32], // Pozicija popup-a u odnosu na ikonu
        });

        this.panels.forEach((panel) => {
          const marker = L.marker([panel.latitude!, panel.longitude!], {
            icon: solarIcon,
          }).addTo(this.map!);

          marker.on('mouseover', () => {
            marker
              .bindPopup(
                `
              <b>${panel.name}</b><br>
              Lat: ${panel.latitude}, Lng: ${panel.longitude}
            `
              )
              .openPopup();
          });

          marker.on('mouseout', () => {
            marker.closePopup();
          });

          marker.on('click', () => {
            console.log('Kliknuto na marker!');
            this.selectedPanel=panel;// Zaustavi propagaciju događaja na mapu
          });
        });
      },
      error: (err) => {
        this.toster.error(err);
      },
    });
  }
}
