import { Component, inject, OnInit } from '@angular/core'
import { Router, RouterModule, RouterLink } from '@angular/router'
import { FormsModule } from '@angular/forms'
import { NgIf } from '@angular/common'
import Swal from 'sweetalert2'
import { AuthService } from '../auth-service'

declare const google: any

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIf, FormsModule, RouterModule, RouterLink],
  templateUrl: './login.html'
})
export class LoginComponent implements OnInit {

  email = ''
  password = ''
  showPassword = false
  loading = false

  private router = inject(Router)
  private auth = inject(AuthService)

  ngOnInit() {
    // Initialize Google SDK
    const checkSDK = setInterval(() => {
      if (typeof google !== 'undefined' && google.accounts && google.accounts.id) {
        clearInterval(checkSDK)
        google.accounts.id.initialize({
          client_id: '1067226069123-t254cc7i510ra0pp1siqejbhbc1ugi01.apps.googleusercontent.com',
          callback: (res: any) => this.handleGoogleResponse(res)
        })
      }
    }, 500)
  }

  togglePassword() {
    this.showPassword = !this.showPassword
  }

  login() {
    if (!this.email || !this.password) return
    this.loading = true

    this.auth.login(this.email, this.password).subscribe({
      next: (res: any) => {
        this.loading = false
        this.auth.setToken(res.token)
        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          timer: 2000,
          showConfirmButton: false,
          position: 'top'
        }).then(() => this.router.navigate(['/home']))
      },
      error: (err) => {
        this.loading = false
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: err.error?.message || 'Invalid credentials!',
          timer: 2500,
          showConfirmButton: false,
          position: 'top'
        })
      }
    })
  }

  // ✅ Google Login
  signInWithGoogle() {
    try {
      google.accounts.id.prompt((notification: any) => {
        if (notification.isNotDisplayed()) {
          Swal.fire('Error', 'Google popup blocked. Try again.', 'error')
        }
      })
    } catch (err) {
      Swal.fire('Error', 'Google login failed. Please refresh page.', 'error')
    }
  }

  handleGoogleResponse(response: any) {
    const token = response.credential
    if (!token) return
    this.auth.setToken(token)

    Swal.fire({
      icon: 'success',
      title: 'Google Login Successful',
      timer: 2000,
      showConfirmButton: false,
      position: 'top'
    }).then(() => this.router.navigate(['/home']))
  }

  // ✅ Microsoft Login (Placeholder)
  signInWithMicrosoft() {
    Swal.fire({
      icon: 'info',
      title: 'Microsoft Login Coming Soon!',
      timer: 2000,
      showConfirmButton: false,
      position: 'top'
    })
  }
}
