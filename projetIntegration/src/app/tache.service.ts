import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TacheService {
  private apiUrl = 'http://localhost:8086/api/taches'; // Assurez-vous que l'URL correspond à votre backend

  constructor(private http: HttpClient) { }

  creerTache(tache: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/creer`, tache).pipe(
      catchError(error => {
        console.error('Une erreur est survenue lors de la création de la tâche :', error);
        return throwError(error);
      })
    );
  }

  recupererTacheParId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error('Une erreur est survenue lors de la récupération de la tâche :', error);
        return throwError(error);
      })
    );
  }
  recupererTachesParProjet(idProjet: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/taches/${idProjet}`).pipe(
      catchError(error => {
        console.error('Une erreur est survenue lors de la récupération des tâches par projet :', error);
        return throwError(error);
      })
    );
  }
 
}
