import { CommonModule } from '@angular/common';
import { Component, numberAttribute, OnInit } from '@angular/core';
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

  constructor(
    private router: Router,
    private client: Client,
    private toster: ToastrService
  ) {}

  ngOnInit(): void {
    this.initMap();
    this.getAllPanels();
  }

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
      if (!this.selectedPanel) {
        const lat = parseFloat(event.latlng.lat.toFixed(4));
        const lng = parseFloat(event.latlng.lng.toFixed(4));
        this.router.navigate(['/panel-setup'], {
          queryParams: { lat: lat, lng: lng },
        });
      }
    });
  }

  getAllPanels() {
    this.client.getAllPanelsByUserId().subscribe({
      next: (response) => {
        this.panels = response.data!;

        const solarIcon = L.icon({
          iconUrl: 'solar-panel.svg',
          iconSize: [32, 32],
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
            this.selectedPanel = panel;
          });
        });
      },
      error: (err) => {
        this.toster.error(err);
      },
    });
  }

  deletePanel(id: number) {
    this.client.delete(id).subscribe({
      next: (response) => {
        window.location.reload()
        this.toster.success(response.message);
      },
      error: (err) => {
        this.toster.error(err);
      },
    });
  }
}
