import { Routes } from '@angular/router';
import { Home } from './Home/home';
import { SignupComponent } from './signup/signup'; // Home ko eager rakha gaya hai

export const routes: Routes = [
  // App start hone par signup page open
  { path: '', redirectTo: 'signup', pathMatch: 'full' },

  { path: 'home', component: Home },

  {
    path: 'products',
    loadComponent: () =>
      import('./products/products').then(m => m.Products),
  },
  {
    path: 'user-role',
    loadComponent: () =>
      import('./UserRole/user-role').then(m => m.UserRole),
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./contact/contact').then(m => m.Contact),
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./profile/profile').then(m => m.Profile),
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./signup/signup').then(m => m.SignupComponent),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login').then(m => m.Login),
  },

  // Agar koi wrong route aaye to redirect to signup
  { path: '**', redirectTo: 'signup' },
];
