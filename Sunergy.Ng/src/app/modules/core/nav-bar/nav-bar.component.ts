import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {

  constructor(private router: Router) {}

  isActive(route: string): boolean { return this.router.url === route; }
}
