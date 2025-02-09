import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Client } from '../../api/api-reference';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-solar-panel',
  imports: [],
  templateUrl: './solar-panel.component.html',
  styleUrl: './solar-panel.component.scss'
})
export class SolarPanelComponent {

  constructor(private route: ActivatedRoute, private client: Client, private toastr: ToastrService){}
  data: any;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    //TODO: Endpoint fot fetching the panel info
    // this.client.setForecastWeather(id).subscribe({
    //   next: (response)=>{
    //     this.data=response;
    //   },
    //   error: (err)=>{
    //     this.toastr.error(err);
    //   }
    // })

    // this.client.setHistoryWeather(id).subscribe({
    //   next: (response)=>{
    //     this.data=response;
    //   },
    //   error: (err)=>{
    //     this.toastr.error(err);
    //   }
    // })
  }
}
