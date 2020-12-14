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


@NgModule({
  declarations: [
    AppComponent
    ,HeaderComponent,SidenavListComponent, LoginComponent,
     SignupComponent, ResertPasswordComponent, AccueilComponent, AlertComponent, EditUserComponent, ViewUserComponent, ListUserComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    FlexLayoutModule,
    HttpClientModule,
    NgbModule,

  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
