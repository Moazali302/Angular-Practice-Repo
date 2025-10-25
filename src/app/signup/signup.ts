import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink, ReactiveFormsModule],
  templateUrl: './signup.html'
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  loading = false;
  showPassword = false;

  countries: string[] = [];
  cities: string[] = [];

  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      country: ['', Validators.required],
      city: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.loadCountries();
  }
 
  loadCountries(): void {
    this.http.get<any>('https://countriesnow.space/api/v0.1/countries')
      .subscribe({
        next: (res) => {
          this.countries = res.data.map((c: any) => c.country);
      
          this.signupForm.patchValue({ country: 'Pakistan' });
          this.loadCities('Pakistan');
        },
        error: (err) => {
          console.error('Failed to load countries:', err);
        }
      });
  }

 
  onCountryChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const countryName = select.value;
    if (countryName) {
      this.signupForm.patchValue({ city: '' });
      this.loadCities(countryName);
    }
  }

  loadCities(countryName: string): void {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post<any>('https://countriesnow.space/api/v0.1/countries/cities', { country: countryName }, { headers })
      .subscribe({
        next: (res) => {
          this.cities = res.data || [];
        },
        error: (err) => {
          console.error('Failed to load cities:', err);
        }
      });
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }


  signup(): void {
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
            title: 'Account Created Successfully!',
            text: 'You can now login to your account.',
            timer: 2500,
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
            text: err.error?.message || 'Something went wrong!',
            timer: 3000,
            showConfirmButton: false,
            position: 'top',
          });
        },
      });
  }
}
