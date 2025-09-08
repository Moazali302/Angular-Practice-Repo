import { Routes } from '@angular/router';
import { Home } from './Home/home';
import { UserRole } from './UserRole/user-role';
import { Contact } from './contact/contact';

export const routes: Routes = [
  { path: 'home', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'user-role', component: UserRole },
  {path : 'contact',component:Contact},
  { path: '**', redirectTo: 'home' }
];
