import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjetServiceService } from '../projet-service.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-page-acceuil',
  templateUrl: './page-acceuil.component.html',
  styleUrls: ['./page-acceuil.component.css']
})
export class PageAcceuilComponent implements OnInit {
  userProjects: any[] = [];

  constructor(private router: Router, private projetService: ProjetServiceService) { }

  ngOnInit(): void {
    const userId = sessionStorage.getItem('userIdConnected');
    if (userId) {
      // Récupérer à la fois les projets de l'utilisateur et les projets associés à l'utilisateur
      forkJoin([
        this.projetService.getUserProjects(Number(userId)),
        this.projetService.getProjetsForUtilisateur(Number(userId))
      ]).subscribe(
        ([userProjects, otherProjects]) => {
          // Combiner les résultats des deux appels API
          this.userProjects = [...userProjects, ...otherProjects];
        },
        (error) => {
          console.error('Error fetching user projects:', error);
        }
      );
    } else {
      console.error('User ID not found in sessionStorage.');
    }
  }

  addProject(): void {
    this.router.navigate(['/add-project']);
  }

  GoToTache(projectId: number, projectTitle: string): void {
    this.router.navigate(['/tache'], { queryParams: { id: projectId, title: projectTitle } });
  }
}
