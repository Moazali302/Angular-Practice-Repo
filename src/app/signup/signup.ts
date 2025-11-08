import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'
import { Router, RouterModule, RouterLink } from '@angular/router'
import { CommonModule } from '@angular/common'
import Swal from 'sweetalert2'
import { AuthService } from '../auth-service'

declare const google: any   // 👈 tell TS about the Google SDK

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink, ReactiveFormsModule],
  templateUrl: './signup.html'
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup
  loading = false
  showPassword = false
  countries: string[] = []
  cities: string[] = []

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      country: ['', Validators.required],
      city: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })

    this.loadCountries()
    this.initializeGoogleButton()   // 👈 setup Google button
  }

  loadCountries(): void {
    fetch('https://countriesnow.space/api/v0.1/countries')
      .then(res => res.json())
      .then(res => {
        this.countries = res.data.map((c: any) => c.country)
        this.signupForm.patchValue({ country: 'Pakistan' })
        this.loadCities('Pakistan')
      })
  }

  onCountryChange(event: Event): void {
    const select = event.target as HTMLSelectElement
    const countryName = select.value
    if (countryName) {
      this.signupForm.patchValue({ city: '' })
      this.loadCities(countryName)
    }
  }

  loadCities(countryName: string): void {
    fetch('https://countriesnow.space/api/v0.1/countries/cities', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ country: countryName })
    })
      .then(res => res.json())
      .then(res => this.cities = res.data || [])
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword
  }

  signup(): void {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched()
      return
    }

    this.loading = true
    this.auth.signup(this.signupForm.value).subscribe({
      next: () => {
        this.loading = false
        Swal.fire({
          icon: 'success',
          title: 'Account Created Successfully!',
          text: 'You can now login to your account.',
          timer: 2500,
          showConfirmButton: false,
          position: 'top',
        }).then(() => {
          this.signupForm.reset()
          this.router.navigate(['/login'])
        })
      },
      error: (err) => {
        this.loading = false
        Swal.fire({
          icon: 'error',
          title: 'Signup Failed',
          text: err.error?.message || 'Something went wrong!',
          timer: 3000,
          showConfirmButton: false,
          position: 'top',
        })
      },
    })
  }

  // -------------------------------
  // GOOGLE LOGIN (OAuth 2.0)
  // -------------------------------
  initializeGoogleButton(): void {
    google.accounts.id.initialize({
      client_id: '1067226069123-t254cc7i510ra0pp1siqejbhbc1ugi01.apps.googleusercontent.com',
      callback: (response: any) => this.handleGoogleResponse(response)
    })

    google.accounts.id.renderButton(
      document.getElementById('googleBtn'),
      { theme: 'outline', size: 'large', width: '100%' }
    )
  }

  handleGoogleResponse(response: any): void {
    const token = response.credential
    if (token) {
      this.auth.setToken(token)
      Swal.fire({
        icon: 'success',
        title: 'Welcome!',
        text: 'Signed in with Google successfully.',
        timer: 2000,
        showConfirmButton: false,
        position: 'top'
      }).then(() => this.router.navigate(['/home']))
    }
  }

  // -------------------------------
  // (Optional) Microsoft login – skip or add your own OAuth flow
  // -------------------------------
  signInWithMicrosoft(): void {
    Swal.fire({
      icon: 'info',
      title: 'Microsoft Login Not Configured',
      text: 'OAuth for Microsoft can be added similarly if needed.',
      timer: 2000,
      showConfirmButton: false
    })
  }
}