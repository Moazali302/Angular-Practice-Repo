import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth-service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    const isLogged = this.auth.isLoggedIn();
    if (isLogged) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
