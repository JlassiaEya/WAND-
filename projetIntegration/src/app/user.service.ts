import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = ' http://localhost:8086/api/users';


  constructor(private http: HttpClient) { }

  getUserProfile(userId: number): Observable<any> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.get<any>(url).pipe(
      catchError(error => {
        console.error('Une erreur est survenue lors de la récupération du profil de l\'utilisateur :', error);
        return throwError(error);
      })
    );
  }
}
