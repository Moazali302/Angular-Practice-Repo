import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { RouterModule, RouterLink } from '@angular/router';
import { AuthService } from '../auth-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIf, FormsModule, RouterModule, RouterLink],
  templateUrl: './login.html'
})
export class Login {
  email = '';
  password = '';
  showPassword = false;
  loading = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private auth: AuthService
  ) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  login() {
    if (!this.email || !this.password) return;

    this.loading = true;

    this.http.post<{ token: string }>(
      'http://localhost:3000/api/auth/login',
      { email: this.email, password: this.password }
    ).subscribe({
      next: (res) => {
        this.loading = false;

        // ✅ Sirf token store ho raha hai
        this.auth.setToken(res.token);

        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          timer: 2000,
          showConfirmButton: false,
          position: 'top'
        }).then(() => {
          // Redirect to home page
          this.router.navigate(['/home']);
        });
      },
      error: (err) => {
        this.loading = false;
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: err.error?.message || 'Invalid credentials!',
          timer: 2500,
          showConfirmButton: false,
          position: 'top'
        });
      }
    });
  }
}
