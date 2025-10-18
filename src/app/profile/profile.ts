import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UpperCasePipe } from '@angular/common';
import { AuthService } from '../auth-service';

@Component({
  selector: 'app-profile',
  imports: [UpperCasePipe],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class Profile implements OnInit {
  user: any;

  constructor(
    private http: HttpClient,
    private authservice: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token) {
   
      this.router.navigate(['/login']);
      return;
    }
    this.http.get<{ user: any }>('http://localhost:3000/api/auth/profile', {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (res) => {
        this.user = res.user;
      },
      error: (err) => {
        console.error(err);
        this.authservice.logout();
        this.router.navigate(['/login']);
      }
    });
  }

  logout(): void {
    this.authservice.logout();
    this.router.navigate(['/login']);
  }
}
