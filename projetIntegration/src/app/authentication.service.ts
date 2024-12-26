import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private baseUrl = 'http://localhost:8086/api';
  private token: string | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>(`${this.baseUrl}/users/login`, { email, password }, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/users/register`, { username, email, password });
  }

  getToken(): string | null {
    return this.token;
  }

  checkToken(): void {
    const token = this.getToken();
    if (token) {
      try {
        this.http.post('', { token }).subscribe(
          (res: any) => {
            if (res.success) {
              this.router.navigate(['admin']);
            }
          },
          (err: any) => {
            console.log(err);
          }
        );
      } catch (error) {
        console.log(error);
      }
    }
  }
  logout(): void {
    sessionStorage.removeItem('userIdConnected'); 
    this.router.navigate(['/home']); 
  }
}
