import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private apiUrl = 'http://localhost:8086/api/send-email'; 

  constructor(private http: HttpClient) { }

  sendEmail(email: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, email).pipe(
      catchError(error => {
        console.error('Une erreur est survenue lors de l\'envoi de l\'e-mail :', error);
        return throwError(error);
      })
    );
  }
}
