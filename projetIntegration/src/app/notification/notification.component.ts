import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/notification.service';
import { AuthenticationService } from '../authentication.service';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  notifications: any[] = [];

  constructor(private notificationService: NotificationService, private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications(): void {
    const destinataire = sessionStorage.getItem('dest');

    if (destinataire) {
      this.notificationService.getNotificationsForUser(destinataire).subscribe(
        (notifications: any[]) => {
          this.notifications = notifications;
        },
        error => {
          console.error('Erreur lors du chargement des notifications :', error);
        }
      );
    } else {
      console.error('Impossible de charger les notifications : utilisateur non connecté.');
    }
  }

  accepterNotification(notificationId: number): void {
    const userId = sessionStorage.getItem('userIdConnected');
    const projectIdFromStorage = sessionStorage.getItem('projectId');
    if (userId && projectIdFromStorage) {
      const projectId = +projectIdFromStorage;
      const userIdNumber = +userId;
      this.notificationService.accepterNotification(notificationId, projectId, userIdNumber).subscribe(
        response => {
          // Traiter la réponse si nécessaire
          console.log('Notification acceptée avec succès');
          // Recharger les notifications après acceptation
          this.loadNotifications();
        },
        error => {
          // Gérer les erreurs
          console.error('Erreur lors de l\'acceptation de la notification', error);
        }
      );
    } else {
      console.error('Impossible de récupérer userId ou projectId à partir de sessionStorage');
    }
  }

  
  
  


  refuserNotification(notificationId: number): void {
    this.notificationService.supprimerNotification(notificationId).subscribe(
      ()  => {
        this.notifications = this.notifications.filter(notification => notification.id !== notificationId);
        console.log('Notification supprimée avec succès');
      },
      error => {
        console.error('Erreur lors de la suppression de la notification :', error);
      }
    )
}
}