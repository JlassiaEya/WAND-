import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Importez ReactiveFormsModule
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { PageAcceuilComponent } from './page-acceuil/page-acceuil.component';
import { HomeComponent } from './home/home.component';
import { UserInterfaceComponent } from './user-interface/user-interface.component';
import { RouterModule } from '@angular/router';
import { TacheComponent } from './tache/tache.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { AjoutTacheComponent } from './AjouterTache/ajout-tache/ajout-tache.component';
import { NotificationComponent } from './notification/notification.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    PageAcceuilComponent,
    HomeComponent,
    UserInterfaceComponent,
    TacheComponent,
    AboutUsComponent,
    ContactUsComponent,
    AddProjectComponent,
    AjoutTacheComponent,
    NotificationComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule, // Ajoutez ReactiveFormsModule à la liste des imports
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
