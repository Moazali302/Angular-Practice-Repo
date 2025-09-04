import { Routes } from '@angular/router';
import { Home } from './Home/home';
import { UserRole } from './UserRole/user-role';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'user-role', component: UserRole },
  { path: '**', redirectTo: 'home' }
];
