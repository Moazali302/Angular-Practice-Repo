import { Routes } from '@angular/router';
import { Home } from './Home/home';
import { UserRole } from './UserRole/user-role';
import { Contact } from './contact/contact';
import { Register } from './register/register';
import { Products } from './products/products';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, 
  { path: 'home', component: Home },
  { path: 'products', component: Products },
  { path: 'user-role', component: UserRole },
  { path: 'contact', component: Contact },
  { path: 'register', component: Register },
  { path: '**', redirectTo: 'home' } 
];
