import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { PageAcceuilComponent } from './page-acceuil/page-acceuil.component';
import { HomeComponent } from './home/home.component';
import { UserInterfaceComponent } from './user-interface/user-interface.component';
import { TacheComponent } from './tache/tache.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { AjoutTacheComponent } from './AjouterTache/ajout-tache/ajout-tache.component';
import { NotificationComponent } from './notification/notification.component';

const routes: Routes = [
  { path: 'page-acceuil', component: PageAcceuilComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'tache', component: TacheComponent },
  { path: 'aboutus', component: AboutUsComponent },
  { path: 'contactus', component: ContactUsComponent },
  { path: 'add-project', component: AddProjectComponent },
  { path: 'ajout-tache', component: AjoutTacheComponent },
  { path: 'Profile', component: UserInterfaceComponent },
  { path: 'notif', component: NotificationComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
