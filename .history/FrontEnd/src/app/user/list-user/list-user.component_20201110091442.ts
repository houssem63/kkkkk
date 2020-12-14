import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Role } from 'src/app/models/role';
import { User } from 'src/app/models/usermodel';
import { ConfirmDialogComponent, ConfirmDialogModel } from 'src/app/tools/confirm/confirm-dialog.component';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import { ViewUserComponent } from '../view-user/view-user.component';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

 /* popoverTitle = ConfirmationPopover.popoverTitle;
  popoverMessage = ConfirmationPopover.popoverMessage;
  confirmClicked = false;
  cancelClicked = false;*/
  popoverTitle = 'Popover title';
  popoverMessage = 'Popover description';
  confirmClicked = false;
  cancelClicked = false;
  displayedColumns: string[] = ['Login', 'Status', 'Role', 'mombredepuis', 'dernierconnection', 'finValidation',
    'Actions'];
  dataSource = new MatTableDataSource<User>();
  constructor(private userservice: UserService,
              private dialog: MatDialog, private loginservice: LoginService) { }
  users: User[] = [];
  ngOnInit(): void {
    this.userservice.getalluser()
    this.userservice.getallusersub().subscribe((res => {

      console.log(res);
      this.users = res;
      this.dataSource.data = res;
      this.users.forEach(u => {
        if (u.Function === 'Personnel' || 'Client') {
          u.Societe = this.users.find(s => s.ID === u.SocieteID)
        }
      })
    }),
      (error) => {
        // afficher toast
        console.error(error);
      });
  }
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
  supprimer(id) {
    this.userservice.delete(id)
  }

  MaxRole(roles: Role[]) {
    return roles.sort((a, b) => a.Poids - b.Poids)[0]?.Libelle;

  }
  openDialog(id): void {
     const dialogRef = this.dialog.open(ViewUserComponent, {
          width: '850px',
          height: '500px',

          data: { ID: id }
      });


  }
  userfilter(type) {


    if (type === 'tous') {
      return this.ngOnInit();

    }

    this.dataSource.data = this.users.filter(u => this.loginservice.userhasrole(u.roles, type));
    // return this.getAuthData().user.roles.findIndex((r: Role) => r.Libelle === type) !== -1;
  }
  userhasrole(roles, role) {
    return this.loginservice.userhasrole(roles, role);

  }
  openDialogabonnement(id): void {
      const dialogRef = this.dialog.open(ViewUserComponent, {
           width: '850px',
           data: {ID: id}
       });

      dialogRef.afterClosed().subscribe(result => {


       });
  }
  confirmDialog(id): void {
    const message = `Are you sure you want to do this?`;

    const dialogData = new ConfirmDialogModel('Confirm Action', message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
if (dialogResult){
  this.userservice.delete(id);
}    });
  }

}
