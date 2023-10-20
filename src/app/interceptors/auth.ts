import { HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
  private router: Router,) { }
intercept(request: HttpRequest<any>, next: HttpHandler): any {
  const token = localStorage.getItem('token');
  if (token) {
    const sessionVaue = {
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    };
    request = request.clone(sessionVaue);
  }
}
}
