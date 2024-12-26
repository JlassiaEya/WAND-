import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TacheService } from 'src/app/tache.service';

@Component({
  selector: 'app-tache',
  templateUrl: './tache.component.html',
  styleUrls: ['./tache.component.css']
})
export class TacheComponent implements OnInit {
  projectId: number | undefined;
  title: string | undefined;
  taches: any[] = []; // Déclarer la propriété taches

  constructor(private route: ActivatedRoute, private router: Router, private tacheService: TacheService) { }

  ngOnInit(): void {
    // Récupérer projectId et title depuis les queryParams
    this.route.queryParams.subscribe(params => {
      this.projectId = +params['id']; // Convertir en nombre
      this.title = params['title'];
      if (this.projectId) {
        sessionStorage.setItem('projectId', this.projectId.toString());      
        // Charger les tâches associées à ce projet
        this.recupererTacheParId(this.projectId); // Appel de la fonction avec l'ID du projet
      } else {
        console.error('Impossible de sauvegarder projectId dans sessionStorage: projectId est indéfini.');
      }
    });
  }

  recupererTacheParId(projectId: number): void {
    // Appeler le service pour récupérer les tâches associées à ce projet
    this.tacheService.recupererTacheParId(projectId).subscribe(
      (response: any) => {
        this.taches = response; // Mettre à jour les données des tâches avec la réponse du service
      },
      error => {
        console.error('Une erreur est survenue lors du chargement des tâches :', error);
      }
    );
  }

  addTache(): void {
    // Vérifiez si projectId est défini avant de naviguer
    if (this.projectId) {
      this.router.navigate(['/ajout-tache'], { queryParams: { id: this.projectId } }); 
    } else {
      console.error("Impossible de naviguer vers la page d'ajout de tâche: l'identifiant du projet est indéfini.");
    }
  }
}
