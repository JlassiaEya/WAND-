import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TacheService } from 'src/app/tache.service';
import { NotificationService } from 'src/app/notification.service';
import { ProjetServiceService } from 'src/app/projet-service.service';

@Component({
  selector: 'app-ajout-tache',
  templateUrl: './ajout-tache.component.html',
  styleUrls: ['./ajout-tache.component.css']
})
export class AjoutTacheComponent implements OnInit {
  nouvelleTache: any = {};
  erreurAjout: string = '';
  projectId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tacheService: TacheService,
    private notificationService: NotificationService,
    private projetService: ProjetServiceService
  ) { }

  ngOnInit(): void {
    const projectIdFromStorage = sessionStorage.getItem('projectId');
    if (projectIdFromStorage) {
      this.projectId = parseInt(projectIdFromStorage, 10);
      console.log('projectId récupéré depuis sessionStorage:', this.projectId);
    } else {
      console.error('projectId non trouvé dans sessionStorage');
    }
  }

  ajouterTache(): void {
    if (this.projectId) {
      this.tacheService.creerTache({
        ...this.nouvelleTache,
        projet: { id: this.projectId }
      }).subscribe(
        () => {
          this.erreurAjout = ''; 
          this.projetService.getProjectDetails(this.projectId).subscribe(
            (projet: any) => {
              const nomProjet = projet.title;
              const emailAssigne = this.nouvelleTache.assigneA;
              const nomTache = this.nouvelleTache.nom;
              const destinataire = emailAssigne;
              const emetteur = sessionStorage.getItem('dest') || ''; 
              const contenu = `Nouvelle tâche assignée : ${nomTache}, projet : ${nomProjet}, ajoutée par : ${sessionStorage.getItem('dest')}`;

              this.notificationService.ajouterNotification({
                contenu,
                destinataire,
                emetteur,
                projet: { id: this.projectId }
              }).subscribe(
                () => {
                  console.log('Notification envoyée avec succès à', destinataire);
                },
                error => {
                  console.error('Erreur lors de l\'envoi de la notification :', error);
                }
              );
            },
            error => {
              console.error('Erreur lors de la récupération des détails du projet :', error);
            }
          );
        },
        error => {
          this.erreurAjout = 'Une erreur est survenue lors de l\'ajout de la tâche.'; // Échec de l'ajout de la tâche
          console.error('Erreur lors de l\'ajout de la tâche :', error);
        }
      );
    } else {
      console.error('Impossible d\'ajouter la tâche: l\'identifiant du projet est indéfini.');
    }
  }
}
