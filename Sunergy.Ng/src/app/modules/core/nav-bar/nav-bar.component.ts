import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Role, UserDto } from '../../../api/api-reference';

@Component({
  selector: 'app-nav-bar',
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}
  Role=Role;

  user: UserDto = new UserDto();

  ngOnInit(): void {
    this.user = this.authService.getUser();
  }

  isActive(route: string): boolean {
    return this.router.url === route;
  }
}
