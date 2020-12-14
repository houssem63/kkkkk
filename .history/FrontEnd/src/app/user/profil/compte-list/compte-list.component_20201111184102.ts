import { Component, Inject, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Banque } from 'src/app/models/banque';
import { Compte } from 'src/app/models/compte';
import { BanqueService } from 'src/app/services/banque.service';
import { CompteService } from 'src/app/services/compte.service';
import { ConfirmDialogComponent, ConfirmDialogModel } from 'src/app/tools/confirm/confirm-dialog.component';
import { AbonnementComponent } from '../../abonnement/abonnement.component';
import { AddCompteComponent } from './add-compte/add-compte.component';

@Component({
  selector: 'app-compte-list',
  templateUrl: './compte-list.component.html',
  styleUrls: ['./compte-list.component.css'],

})
export class CompteListComponent implements OnInit {

  constructor(public dialog: MatDialog, private banqueservice: BanqueService, private compteservice: CompteService) { }
  @Input() public IDuser: string;
  comptes: Compte[] = []
  banques: Banque[] = []

  ngOnInit(): void {

      this.compteservice.getallcompteuser(this.IDuser)
      this.compteservice.getcomptesub().subscribe((res) => {
          this.comptes = res ;
           console.log(this.comptes)})
     /*  this.banqueservice.getallbanque();
     this.banqueservice.banquesub().subscribe((responce) => {
          this.banques = responce;
          this.comptes.map(c => {
              this.banques.map(b => {
                  if (c.banqueID === b.ID) {

                      c.banquenom = b.libelle;
                  }
              })
          })
      });*/





  }
  openDialog(): void {
      const dialogRef = this.dialog.open(AddCompteComponent, {
          width: '450px',
          data: { IDuser: this.IDuser,Mode :'create' }
      });

      dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');

      });
  }
  opendialogconfirm(id){
    const message = `Are you sure you want to do this?`;

    const dialogData = new ConfirmDialogModel('Confirm Action', message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
    if (dialogResult){
  this.compteservice.delete(id);
}    });
  }
edit(id){
  const dialogRef = this.dialog.open(AddCompteComponent, {
    width: '450px',
    data: { IDuser: this.IDuser ,Mode :'edit',compteID:id}
});

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');

});
}
}
