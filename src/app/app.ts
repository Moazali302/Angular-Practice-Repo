import { Component, signal } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { Header } from "./header/header";
import { Footer } from "./footer/footer";
import { NgIf } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header, Footer,NgIf],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = signal('angular-app');
  showLayout = signal(true);

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(event => {
        const url = event.urlAfterRedirects;
        console.log('✅ Current URL:', url); // debug line

        const hideRoutes = ['/login', '/signup','/forgot-password','/reset-password'];
        const shouldHide = hideRoutes.some(r => url.startsWith(r));
        this.showLayout.set(!shouldHide);
        console.log('Show layout:', !shouldHide); // debug line
      });
  }
}
