import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { HttpClient } from '@angular/common/http'
import { NgIf } from '@angular/common'
import Swal from 'sweetalert2'
import { RouterModule } from '@angular/router'

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule, NgIf,RouterModule],
  templateUrl: './forgot-password.html',
  styleUrls: ['./forgot-password.css']
})
export class ForgotPassword {

  email: string = ''
  loading: boolean = false

  constructor(private http: HttpClient) {}

  onSubmit() {

    if(!this.email){
      Swal.fire({
        icon: 'warning',
        title: 'Email Required',
        text: 'Please enter your registered email address.',
        confirmButtonColor: '#3b82f6',
        background: '#0f172a',
        color: '#e2e8f0',
        iconColor: '#38bdf8',
        position: 'top'
      })
      return
    }
    this.loading = true
    this.http.post('http://localhost:3000/api/auth/forgot-password', { email: this.email })
    .subscribe({
      next: () => {
        this.loading = false
        this.email = ''
        Swal.fire({
          icon: 'success',
          title: 'Reset Link Sent!',
          text: 'A password reset link has been sent to your email.',
          timer: 2500,
          showConfirmButton: false,
          position: 'top',
          background: '#0f172a',
          color: '#e0f2fe',
          iconColor: '#22d3ee'
        })
      },
      error: (err) => {
        this.loading = false
        Swal.fire({
          icon: 'error',
          title: 'Failed to Send Link',
          text: err.error?.message || 'Something went wrong. Please try again later.',
          confirmButtonColor: '#ef4444',
          background: '#0f172a',
          color: '#fecaca',
          iconColor: '#f87171',
          position: 'top'
        })
      }
    })
  }
}
