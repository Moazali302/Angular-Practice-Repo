// Angular-Practice-Repo/src/app/login/login.ts

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

    // ✅ Wait until Google SDK loads properly
    const checkSDK = setInterval(() => {
      if (typeof google !== 'undefined' && google.accounts && google.accounts.id) {
        clearInterval(checkSDK)

        // ✅ Initialize Google Identity with FedCM support
        google.accounts.id.initialize({
          client_id: '1067226069123-t254cc7i510ra0pp1siqejbhbc1ugi01.apps.googleusercontent.com',
          callback: (res: any) => this.handleGoogleResponse(res),
          use_fedcm_for_prompt: true  // 👈 Important for new FedCM flow
        })

        // ✅ Render Sign-In button
        const btn = document.getElementById('googleBtn')
        if (btn) {
          google.accounts.id.renderButton(btn, {
            theme: 'outline',
            size: 'large',
            width: 250
          })
        }

        // Optional: Preload prompt (non-blocking)
        try {
          google.accounts.id.prompt((notification: any) => {
            if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
              console.log('Google prompt skipped or not displayed.')
            }
          })
        } catch (err: any) {
          if (err.name === 'AbortError') {
            console.log('Google login aborted (safe to ignore).')
          } else {
            console.error('Google prompt error:', err)
          }
        }
      }
    }, 400)
  }

  // ✅ Toggle password visibility
  togglePassword() {
    this.showPassword = !this.showPassword
  }

  // ✅ Normal Email/Password login
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
          showConfirmButton: false
        }).then(() => this.router.navigate(['/home']))
      },
      error: (err) => {
        this.loading = false
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: err.error?.message || 'Invalid credentials!',
          timer: 2500,
          showConfirmButton: false
        })
      }
    })
  }

  // ✅ Manual Google login trigger (if needed)
  signInWithGoogle() {
    try {
      google.accounts.id.prompt()
    } catch (err: any) {
      if (err.name === 'AbortError') {
        console.log('Google sign-in aborted (ignore safely).')
      } else {
        Swal.fire('Error', 'Google login failed. Please refresh page.', 'error')
      }
    }
  }

  // ✅ Handle Google credential response
  handleGoogleResponse(response: any) {
    const googleToken = response.credential
    if (!googleToken) return

    // Send token to backend for verification
    this.auth.socialLogin(googleToken, 'google').subscribe({
      next: (res: any) => {
        this.auth.setToken(res.token)
        Swal.fire({
          icon: 'success',
          title: 'Google Login Successful',
          timer: 2000,
          showConfirmButton: false
        }).then(() => this.router.navigate(['/home']))
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Google Login Failed',
          text: err.error?.message || 'Try again later',
          timer: 2500,
          showConfirmButton: false
        })
      }
    })
  }

  // ✅ Placeholder for Microsoft login
  signInWithMicrosoft() {
    Swal.fire({
      icon: 'info',
      title: 'Microsoft Login Coming Soon!',
      timer: 2000,
      showConfirmButton: false
    })
  }
}
