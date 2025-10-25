import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './reset-password.html',
  styleUrls: ['./reset-password.css']
})
export class ResetPassword implements OnInit {
  password: string = '';
  confirmPassword: string = '';
  token: string = '';
  loading: boolean = false;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token') || '';
  }

  onSubmit():void {
    if (!this.password || !this.confirmPassword) {
       Swal.fire({
        icon: 'warning',
        title: '⚠️ Missing Fields',
        text: 'Please fill out both password fields!',
        confirmButtonText: 'Okay',
        confirmButtonColor: '#3085d6',
        background: '#fefefe',
        color: '#333',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      });
      return;
    }

    if (this.password !== this.confirmPassword) {
     Swal.fire({
        icon: 'error',
        title: '❌ Passwords Do Not Match',
        text: 'Make sure both passwords are identical.',
        confirmButtonText: 'Try Again',
        confirmButtonColor: '#d33',
        background: '#fff',
        color: '#333',
        showClass: {
          popup: 'animate__animated animate__shakeX'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      });
      return;
    }

    this.loading = true;

    this.http
      .post(`http://localhost:3000/api/auth/reset-password/${this.token}`, {
        password: this.password,
      })
      .subscribe({
        next: () => {
          this.loading = false;
          Swal.fire({
            icon: 'success',
            title: '🎉 Password Updated!',
            html: `
              <p style="font-size: 16px; margin-top: 8px;">
                Your password has been successfully reset.<br>
                You can now log in with your new credentials.
              </p>
            `,
            confirmButtonText: 'Go to Login',
            confirmButtonColor: '#3b82f6',
            background: '#fefefe',
            color: '#333',
            showClass: {
              popup: 'animate__animated animate__fadeInUpBig'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutDownBig'
            }
          }).then(() => this.router.navigate(['/login']));
        },
        error: (err) => {
          this.loading = false;
          Swal.fire({
            icon: 'error',
            title: '🚫 Reset Failed',
            text: err.error?.message || 'Token is invalid or expired!',
            confirmButtonText: 'Try Again',
            confirmButtonColor: '#d33',
            background: '#fff',
            color: '#333',
            showClass: {
              popup: 'animate__animated animate__shakeX'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
          });
        },
      });
  }

  togglePassword(field: 'password' | 'confirm') {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }
}
