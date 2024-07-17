// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor( private router: Router) { }

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      // If token is present, redirect to AddTaskComponent
      this.router.navigate(['/']);
      return false; // Return false to prevent accessing the original route
    } else {
      // If token is not present, redirect to login page
      this.router.navigate(['/login']);
      return false;
    }
  }
}