import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Client } from '../../api/api-reference';

@Component({
  selector: 'app-solar-panel',
  imports: [],
  templateUrl: './solar-panel.component.html',
  styleUrl: './solar-panel.component.css'
})
export class SolarPanelComponent {

  constructor(private route: ActivatedRoute, private client: Client){}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    //TODO: Endpoint fot fetching the panel info
  }
}
