import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    private jwtService = new JwtHelperService();
  
    constructor(private router: Router) {}
  
    logout() {
      localStorage.removeItem('token');
      localStorage.clear();
      this.router.navigate(['/login']);
    }
  
    isLoggedIn() {
      const token = localStorage.getItem('token');
      if (!token) return false;
  
      return !this.jwtService.isTokenExpired(token);
    }

    getUser(){
      return this.jwtService.decodeToken(localStorage.getItem('token')!);
    }
  }