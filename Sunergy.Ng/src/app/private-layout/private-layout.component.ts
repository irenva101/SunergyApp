import { Component } from '@angular/core';
import { NavBarComponent } from '../modules/core/nav-bar/nav-bar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-private-layout',
  imports: [NavBarComponent, RouterOutlet],
  templateUrl: './private-layout.component.html',
  styleUrl: './private-layout.component.css'
})
export class PrivateLayoutComponent {

}
