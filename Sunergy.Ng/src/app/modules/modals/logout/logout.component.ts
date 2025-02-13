import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-logout',
  imports: [CommonModule, RouterLink],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css',
})
export class LogoutComponent {
  isModalOpen = true;
  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }

  toggleInput(){
    this.isModalOpen=!this.isModalOpen;
  }
}
