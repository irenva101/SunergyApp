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
export class AppComponent {
  title = 'Sunergy.Ng';
}
