import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string | undefined;
  password: string | undefined;
  errorMessage: string | undefined;

  constructor(private authService: AuthenticationService, private router: Router) { }

  login(): void {
    if (!this.email || !this.password) {
      this.errorMessage = 'Email and password are required';
      return;
    }

    this.authService.login(this.email, this.password)
      .subscribe(
        response => {
          console.log('Login successful', response);
          if (response && response.userId && response.email) { // Vérifiez si le champ userId est présent dans la réponse
            sessionStorage.setItem('userIdConnected', response.userId);
            sessionStorage.setItem('dest', response.email);

          } else {
            console.error('UserID not found in login response:', response);
          }
          this.errorMessage = undefined;
          this.email = '';
          this.password = ''; 
          this.router.navigate(['/page-acceuil']);
        },
        error => {
          console.error('Login error', error);
          if (error.status === 401) {
            this.errorMessage = 'Invalid email or password';
          } else {
            this.errorMessage = 'An unexpected error occurred. Please try again later.';
          }
        }
      );
  }
}
