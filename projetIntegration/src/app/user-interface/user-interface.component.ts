import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { AuthenticationService } from '../authentication.service'; // Importez le service AuthenticationService

@Component({
  selector: 'app-user-interface',
  templateUrl: './user-interface.component.html',
  styleUrls: ['./user-interface.component.css']
})
export class UserInterfaceComponent implements OnInit {
  user: any;
  errorMessage: string = '';

  constructor(private userService: UserService, private authentication: AuthenticationService) { } // Injectez AuthenticationService ici

  ngOnInit(): void {
    const userId = sessionStorage.getItem('userIdConnected'); 
    if (!userId) {
      console.error('UserID not found in sessionStorage.');
      return;
    }
    const userIdInt: number = parseInt(userId, 10);
    this.getUserProfile(userIdInt);
  }

  getUserProfile(userId: number): void {
    this.userService.getUserProfile(userId).subscribe(
      user => {
        if (user) {
          this.user = user;
          console.log('Informations de l\'utilisateur récupérées :', this.user);
        } else {
          this.errorMessage = 'Aucune donnée utilisateur disponible.';
        }
      },
      error => {
        console.error('Une erreur est survenue lors de la récupération des informations de l\'utilisateur :', error);
        this.errorMessage = 'Une erreur est survenue lors de la récupération des informations de l\'utilisateur.';
      }
    );
  } 

  logout(): void {
    this.authentication.logout();
  }
}
