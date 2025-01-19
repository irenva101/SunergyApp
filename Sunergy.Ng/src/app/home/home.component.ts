import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Client, PanelDataIn } from '../api/api-reference';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  requestData= new PanelDataIn({
    "id": 1,
    "name": "Subotica",
    "installedPower": 40,
    "efficiency": 0.8,
    "longitude": 19.6631,
    "latitude": 46.0986
  })
  data: any;

  constructor(private client: Client , private toastr: ToastrService){
    this.reloadTable();
  }

  reloadTable() {
    // this.client.save(this.requestData).subscribe({
    //   next:(response)=>{
    //     this.data=response;
    //   },
    //   error:(err)=>{
    //     this.toastr.error("Something went wrong:" + err);
    //   }
    // })
  }

}
