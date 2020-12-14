import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { NgbDropdown, NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { ModePaiement } from '../models/modepaiement';
import { ModePaiementService } from '../services/mode-paiement.service';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../tools/confirm/confirm-dialog.component';

@Component({
  selector: 'app-mode-de-paiment',
  templateUrl: './mode-de-paiment.component.html',
  styleUrls: ['./mode-de-paiment.component.css']
})
export class ModeDePaimentComponent implements OnInit {
  displayedColumns: string[] = ['Libelle',
  'Actions'];
dataSource = new MatTableDataSource<ModePaiement>();
modepaiements : ModePaiement [] = []
formbanque;
@ViewChild('myDrop', { static: true }) myDrop: NgbDropdown;
  formbanque1: FormGroup;
  placement;
  public innerWidth: number;
  modepaiement: ModePaiement;
  constructor(private modePaiementService: ModePaiementService,
              public config: NgbDropdownConfig, private dialog: MatDialog) {
    this.placement= 'left-buttom';


   }
   @HostListener('window:resize', ['$event'])
   onResize(event) {
     this.innerWidth = window.innerWidth;
     console.log(typeof this.innerWidth);
     if (this.innerWidth < 840 ){
       this.placement ='bottom-right'
     }else{
      this.placement= 'left-buttom';

     }
   }
  ngOnInit(): void {
    this.modePaiementService.getall();
    this.modePaiementService.modesub().subscribe(res=>{
      console.log(res)
      this.modepaiements = res;
      this.dataSource.data = res;
    })
    this.formbanque =new FormGroup({
      Libelle : new FormControl(null,[Validators.required])
    })
    this.formbanque1 =new FormGroup({
      Libelle1 : new FormControl(null,[Validators.required])
    });
    this.innerWidth = window.innerWidth;
    if (this.innerWidth < 840 ){
      this.placement ='bottom-right'
    }else{
     this.placement= 'left-buttom';

    }  }
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
  save(){
if(this.formbanque.invalid){
  return;
}
 this.modePaiementService.add(this.formbanque.value.Libelle)
console.log(this.formbanque)


    this.formbanque?.resetForm();



this.myDrop.close();

}
edit(){
  if(this.formbanque1.invalid){
    return;
  }
  this.modepaiement.Libelle = this.formbanque1.value.Libelle1;
  this.modePaiementService.edit(this.modepaiement)
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
    this.modePaiementService.delete(id);
}    });
}
patch(id){
  this.modePaiementService.getonemode(id).subscribe((res=>{
    console.log(res)
    this.modepaiement= res.mode;
    this.formbanque1.setValue({
      Libelle1 :res.mode.Libelle
    })
  }))
}

}
