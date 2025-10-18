import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) {}


  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }
  setToken(token: string) {
    localStorage.setItem('token', token);
  }


  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getProfile(): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/profile`, { headers });
  }

  logout() {
    localStorage.removeItem('token');
  }

  
  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
