import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const token = localStorage.getItem('token');

    if (token) {
      console.log('Adding token to request:', token);
      request = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + token),
      });
    } else {
      console.log('No token found');
    }

    return next.handle(request);
  }
}
