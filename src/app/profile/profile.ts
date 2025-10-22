import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth-service';
import Swal from 'sweetalert2'; // ✅ sweetalert2 import
import { NgIf, UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports:[UpperCasePipe,FormsModule,NgIf],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css'],
})
export class Profile implements OnInit {
  user: any = {};
  updatedUser: any = {};
  isEditing = false;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    // ✅ Get Profile from backend
    this.http
      .get<{ user: any }>('http://localhost:3000/api/auth/profile', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .subscribe({
        next: (res) => {
          this.user = res.user;
          this.updatedUser = { ...this.user };
        },
        error: (err) => {
          console.error(err);
          this.authService.logout();
          this.router.navigate(['/login']);
        },
      });
  }

  // ✅ Enable Edit Mode
  enableEdit() {
    this.isEditing = true;
    this.updatedUser = { ...this.user };
  }

  // ✅ Save Changes and show SweetAlert2 popup
  saveChanges() {
    const token = localStorage.getItem('token');
    if (!token) return;

    this.http
      .put<{ message: string; user: any }>(
        'http://localhost:3000/api/auth/update',
        this.updatedUser,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .subscribe({
        next: (res) => {
          this.user = res.user;
          this.isEditing = false;

          Swal.fire({
            title: 'Profile Updated!',
            text: 'Your changes have been saved successfully.',
            icon: 'success',
            background: '#1e293b',
            color: '#fff',
            iconColor: '#22c55e',
            showConfirmButton: false,
            timer: 2000,
            toast: true,
            position: 'top-end',
            showClass: {
              popup: `
                animate__animated
                animate__fadeInDown
              `,
            },
            hideClass: {
              popup: `
                animate__animated
                animate__fadeOutUp
              `,
            },
          });
        },
        error: (err) => {
          console.error(err);
          Swal.fire({
            title: 'Update Failed!',
            text: 'Something went wrong. Please try again.',
            icon: 'error',
            confirmButtonColor: '#dc2626',
            background: '#1e293b',
            color: '#fff',
          });
        },
      });
  }

  // ✅ Logout
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
