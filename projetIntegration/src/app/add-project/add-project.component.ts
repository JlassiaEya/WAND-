import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ProjetServiceService } from '../projet-service.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit, OnDestroy {
  projectName: string = '';
  projectDescription: string = '';
  submissionInProgress: boolean = false;
  successMessage: string = '';
  private addProjectSubscription!: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private projetService: ProjetServiceService,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    // Initialiser le message de succès à vide
    this.successMessage = '';
  }

  ngOnDestroy(): void {
    if (this.addProjectSubscription) {
      this.addProjectSubscription.unsubscribe();
    }
  }

  submitForm(): void {
    // Vérifiez si le nom ou la description du projet est vide ou si une soumission est déjà en cours
    if (!this.projectName || !this.projectDescription || this.submissionInProgress) {
      return;
    }

    // Marquez la soumission en cours
    this.submissionInProgress = true;

    // Récupérez l'ID de l'utilisateur connecté
    const userId = sessionStorage.getItem('userIdConnected');
    if (userId) {
      // Construisez les données du projet
      const projectData = {
        title: this.projectName,
        description: this.projectDescription,
        manager: { id: userId }
      };

      // Appelez le service pour ajouter le projet
      this.addProjectSubscription = this.projetService.addProject(projectData)
        .subscribe(
          (response) => {
            // Gérez la réponse réussie
            console.log('Projet ajouté avec succès :', response);
            // Mettez à jour le message de succès
            this.successMessage = 'Le projet a été ajouté avec succès.';
            // Réinitialiser les champs après l'ajout du projet
            this.projectName = '';
            this.projectDescription = '';
            this.submissionInProgress = false;
          },
          (error) => {
            // Gérez les erreurs
            console.error('Une erreur est survenue lors de l\'ajout du projet :', error);
            this.submissionInProgress = false;
          }
        );
    } else {
      // Gérez le cas où l'ID de l'utilisateur n'a pas pu être récupéré
      console.error('Impossible de récupérer l\'ID de l\'utilisateur connecté depuis sessionStorage.');
      this.submissionInProgress = false;
    }
  }
}
