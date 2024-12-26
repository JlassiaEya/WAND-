// projet-service.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ProjetServiceService {
  private apiUrl = 'http://localhost:8086/api/projets';
  
  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) { }

  getProjects(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Une erreur est survenue lors de la récupération des projets :', error);
        return throwError(error);
      })
    );
  }

  addProject(projectData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, projectData).pipe(
      catchError(error => {
        console.error('Une erreur est survenue lors de l\'ajout du projet :', error);
        return throwError(error);
      })
    );
  }
  

  updateProject(project: any): Observable<any> {
    const url = `${this.apiUrl}/${project.id}`;
    return this.http.put<any>(url, project).pipe(
      catchError(error => {
        console.error('Une erreur est survenue lors de la mise à jour du projet :', error);
        return throwError(error);
      })
    );
  }

  deleteProject(projectId: string): Observable<any> {
    const url = `${this.apiUrl}/${projectId}`;
    return this.http.delete<any>(url).pipe(
      catchError(error => {
        console.error('Une erreur est survenue lors de la suppression du projet :', error);
        return throwError(error);
      })
    );
  }
  getUserProjects(userId: number): Observable<any[]> {
    const url = `${this.apiUrl}/user/${userId}`;
    return this.http.get<any[]>(url).pipe(
      catchError(error => {
        console.error('Une erreur est survenue lors de la récupération des projets de l\'utilisateur :', error);
        return throwError(error);
      })
    );
  }       
  getProjectDetails(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  } 
  getProjetsForUtilisateur(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/utilisateur/${userId}`);
  }
}
