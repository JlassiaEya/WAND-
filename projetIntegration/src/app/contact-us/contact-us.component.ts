import { Component } from '@angular/core';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {
  name: string | undefined;
  email: string | undefined;
  subject: string | undefined;
  message: string | undefined;
  successMessage: string | undefined;

  submitForm(): void {
    // Here, you can add the logic to handle the form submission, such as sending the data to a backend server
    // For now, let's just set a success message
    this.successMessage = 'Your message has been sent successfully!';
    
    // Clear the form fields after submission
    this.name = '';
    this.email = '';
    this.subject = '';
    this.message = '';
  }
}
