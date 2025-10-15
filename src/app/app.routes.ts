import { Routes } from '@angular/router';
import { Home } from './Home/home'; // Home ko eager rakhenge

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
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
    loadComponent:()=>
      import('./profile/profile').then(m=>m.Profile),
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./signup/signup').then(m => m.Signup),
  },
  { path: '**', redirectTo: 'home' },
];
