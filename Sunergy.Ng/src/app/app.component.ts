import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Client } from './api/api-reference';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Sunergy.Ng';

  constructor(private client: Client){
    
  }
  ngOnInit(): void {
    this.client.login().subscribe({
      next: (response) => {
        console.log(response);
      }
    });
  }
}
