import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Client, PanelDataIn, PanelType } from '../api/api-reference';
import { MapComponent } from '../modules/map/map.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-panel-setup',
  imports: [CommonModule, FormsModule, MapComponent],
  templateUrl: './panel-setup.component.html',
  styleUrl: './panel-setup.component.scss',
})
export class PanelSetupComponent implements OnInit {
  data: PanelDataIn = new PanelDataIn();
  isMapOpen = false;
  latitude: string | undefined;
  longitude: string | undefined;
  isLatLongSet: boolean=false;
  constructor(private client: Client, private route: ActivatedRoute, private toastr: ToastrService, private routeNav: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.data.latitude = params['lat'];
      this.data.longitude = params['lng'];
      this.isLatLongSet=true;
    });
    if(!this.data.latitude &&  !this.data.longitude)
      this.isLatLongSet=false;
  }

  onSubmit() {
    this.client.save(this.data).subscribe({
      next: (response) => {
        this.toastr.success("Uspesno ste postavili elektranu.");
        this.routeNav.navigate(['/map']);
      },
      error: (err)=> {
        this.toastr.error(err);
      }
    })
  }

  panelTypes: PanelType[] = Object.keys(PanelType)
    .filter((key) => isNaN(Number(key)))
    .map((key) => PanelType[key as keyof typeof PanelType]);
}
