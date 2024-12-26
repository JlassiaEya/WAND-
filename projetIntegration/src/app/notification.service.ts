import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private apiUrl = 'http://localhost:8086/notifications'; 

  constructor(private http: HttpClient) { }

  ajouterNotification(nouvellenotif: any): Observable<any> {
    const { contenu, destinataire, emetteur, projet } = nouvellenotif;
    return this.http.post<any>(this.apiUrl + '/creer', { contenu, destinataire, emetteur, projet });
  }

  getNotificationsForUser(destinataire: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/user/${destinataire}`);
  }

  accepterNotification(notificationId: number, projectId: number, userId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/accepter-notification/${notificationId}/${projectId}/${userId}`, {});
  }
  
  
  supprimerNotification(notificationId: number): Observable<void> {
    const url = `${this.apiUrl}/${notificationId}`;
    return this.http.delete<void>(url);
  }
}
