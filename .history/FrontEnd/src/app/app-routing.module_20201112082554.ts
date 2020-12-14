import { ViewUserComponent } from './user/view-user/view-user.component';
import { ListUserComponent } from './user/list-user/list-user.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { LoginComponent } from './authentification/login/login.component';
import { ResertPasswordComponent } from './authentification/resert-password/resert-password.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { ProfilComponent } from './user/profil/profil.component';
import { BanqueComponent } from './banque/banque.component';
import { PrestataireAssuranceComponent } from './prestataire-assurance/prestataire-assurance.component';



const routes: Routes = [
  { path: '', component: AccueilComponent },
  { path: 'connexion', component: LoginComponent },
  { path: 'liste_banque', component: BanqueComponent },


  {
    path: 'utilisateur',
    children: [
      {
        path: 'inscription',
        component: EditUserComponent,
      },
      {
        path: 'edit',
        component: EditUserComponent,
      },
      {
        path: 'afficher_utilisateur',
        component: ViewUserComponent,
      },
      {
        path: 'liste_utilisateur',
        component: ListUserComponent,
      } , {
        path: 'profile',
        component: ProfilComponent,
      },
    ]},
    {path : 'prestataire_assurance', component : PrestataireAssuranceComponent},
  { path : 'mot-de-passe' , component: ResertPasswordComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
