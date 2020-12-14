import { ConfirmDialogComponent } from 'src/app/tools/confirm/confirm-dialog.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './module/material.module';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './authentification/login/login.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SignupComponent } from './authentification/signup/signup.component';
import { ResertPasswordComponent } from './authentification/resert-password/resert-password.component';
import { LoginService } from './services/login.service';
import { HttpClientModule } from '@angular/common/http';
import { AccueilComponent } from './accueil/accueil.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AlertComponent } from './alert/alert.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { ViewUserComponent } from './user/view-user/view-user.component';
import { ListUserComponent } from './user/list-user/list-user.component';
import { DatePipe } from '@angular/common';
import { AbonnementComponent } from './user/abonnement/abonnement.component';
import { ProfilComponent } from './user/profil/profil.component';
import { ImagezoomComponent } from './tools/imagezoom/imagezoom.component';
import { ChangepasswordComponent } from './user/profil/changepassword/changepassword.component';
import { CompteListComponent } from './user/profil/compte-list/compte-list.component';
import { AddCompteComponent } from './user/profil/compte-list/add-compte/add-compte.component';
import { NgxMaskModule } from 'ngx-mask';
import { BanqueComponent } from './banque/banque.component';
import { PrestataireAssuranceComponent } from './prestataire-assurance/prestataire-assurance.component';
import { EntretienComponent } from './entretien/entretien.component';
import { PersonnelComponent } from './personnel/personnel.component';
import { VehiculeComponent } from './vehicule/vehicule.component';
import { EditVehiculeComponent } from './vehicule/edit-vehicule/edit-vehicule.component'


@NgModule({
  declarations: [
    AppComponent
    ,HeaderComponent,SidenavListComponent, LoginComponent,
     SignupComponent, ResertPasswordComponent, AccueilComponent, AlertComponent,
      EditUserComponent, ViewUserComponent, ListUserComponent,
      ConfirmDialogComponent,
      AbonnementComponent,
      ProfilComponent,
      ImagezoomComponent,
      ChangepasswordComponent,
      CompteListComponent,
      AddCompteComponent,
      BanqueComponent,
      PrestataireAssuranceComponent,
      EntretienComponent,
      PersonnelComponent,
      VehiculeComponent,
      EditVehiculeComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    FlexLayoutModule,
    HttpClientModule,
    NgbModule,
    NgxMaskModule.forRoot(),

  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
  entryComponents :[
    ConfirmDialogComponent,
    AbonnementComponent,
    ImagezoomComponent,
    AddCompteComponent
    ]
})
export class AppModule { }
