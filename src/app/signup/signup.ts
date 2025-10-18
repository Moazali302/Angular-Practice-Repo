import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule,RouterModule,RouterLink, ReactiveFormsModule],
  templateUrl: './signup.html'
})
export class SignupComponent {
  signupForm: FormGroup;
  loading = false;
  showPassword = false;

  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      city: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  signup() {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.http.post('http://localhost:3000/api/auth/signup', this.signupForm.value)
      .subscribe({
        next: () => {
          this.loading = false;
          Swal.fire({
            icon: 'success',
            title: 'Account Created Successfully ',
            text: 'You can now login to your account',
            timer: 3000,        // 3 seconds auto-close
            timerProgressBar: true,
            showConfirmButton: false,
            position: 'top',
          }).then(() => {
            this.signupForm.reset();
            this.router.navigate(['/login']);
          });
        },
        error: err => {
          this.loading = false;
          Swal.fire({
            icon: 'error',
            title: 'Signup Failed',
            text: err.error.message || 'Something went wrong!',
            timer: 3000,        // 3 seconds auto-close
            timerProgressBar: true,
            showConfirmButton: false,
            position: 'top',
          });
        },
      });
  }
}
