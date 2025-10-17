import { Component, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports:[NgIf, FormsModule,RouterModule,RouterLink],
  standalone: true,
  templateUrl: './login.html'
})
export class Login {
  email = '';
  password = '';
  showPassword = false;
  loading = false;

  constructor(private http: HttpClient, private router: Router) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  login() {
    if (!this.email || !this.password) return;

    this.loading = true;
    this.http.post<{ user: any }>('http://localhost:3000/api/auth/login', {
      email: this.email,
      password: this.password
    }).subscribe({
      next: () => {
        this.loading = false;
        Swal.fire({
          icon: 'success',
          title: 'Login Successful 🎉',
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false,
          position: 'top',
        }).then(() => {
          this.router.navigate(['/home']);
        });
      },
      error: (err) => {
        this.loading = false;
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: err.error.message || 'Invalid credentials!',
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false,
          position: 'top',
        });
      }
    });
  }
}
