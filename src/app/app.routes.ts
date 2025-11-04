import { Routes } from '@angular/router';
import { Home } from './Home/home';
import { AuthGuard } from './auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'signup', pathMatch: 'full' },

  { path: 'home', component: Home, canActivate: [AuthGuard] },

  {
    path: 'products',
    loadComponent: () =>
      import('./products/products').then(m => m.Products),
    canActivate: [AuthGuard]
  },
  {
    path: 'user-role',
    loadComponent: () =>
      import('./UserRole/user-role').then(m => m.UserRole),
    canActivate: [AuthGuard]
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./contact/contact').then(m => m.Contact),
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./profile/profile').then(m => m.Profile),
    canActivate: [AuthGuard]
  },

  {
    path: 'signup',
    loadComponent: () =>
      import('./signup/signup').then(m => m.SignupComponent),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login').then(m => m.LoginComponent),
  },

  {
    path: 'forgot-password',
    loadComponent: () =>
      import('./forgot-password/forgot-password').then(m => m.ForgotPassword),
  },
  {
  path: 'reset-password/:token',
  loadComponent: () =>
    import('./reset-password/reset-password').then(m => m.ResetPassword)
},

  { path: '**', redirectTo: 'signup' }
];
