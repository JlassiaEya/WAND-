import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  username: string | undefined;
  email: string | undefined;
  password: string | undefined; 
  successMessage: string | undefined; 

  constructor(private router: Router, private authService: AuthenticationService) { } 

  register(): void {
    if (!this.email || !this.username || !this.password) {
      return;
    }

    this.authService.register(this.username, this.email, this.password)
      .subscribe(
        response => {
          console.log('Registration successful', response);
          if (response && response.id && response.email) { 
            sessionStorage.setItem('userIdConnected', response.id);
            sessionStorage.setItem('dest', response.email);
            this.successMessage = 'Account created successfully';
            this.router.navigate(['/page-acceuil']);
          } else {
            console.error('UserID or email not found in registration response:', response);
          }
        },
        error => {
          console.error('Registration error', error);
        }
      );
  }
}
