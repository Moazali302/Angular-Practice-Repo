// Angular-Practice-Repo/src/app/auth-service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) {}

  // 🔹 Signup user
  signup(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, userData);
  }

  // 🔹 Login user
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  // 🔹 Social login (Google / Microsoft)
  socialLogin(providerToken: string, provider: 'google' | 'microsoft'): Observable<any> {
    // backend expects { token } in body
    return this.http.post(`${this.apiUrl}/${provider}`, { token: providerToken });
  }

  // 🔹 Save token in local storage
  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // 🔹 Get stored token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // 🔹 Get user profile (with auth header)
  getProfile(): Observable<any> {
    const token = this.getToken();
    if (!token) throw new Error('No token found');
    
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/profile`, { headers });
  }

  // 🔹 Logout user
  logout(): void {
    localStorage.removeItem('token');
  }

  // 🔹 Check login status
  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}