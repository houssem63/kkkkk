import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { NgbDropdown, NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { Banque } from '../models/banque';
import { BanqueService } from '../services/banque.service';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../tools/confirm/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-banque',
  templateUrl: './banque.component.html',
  styleUrls: ['./banque.component.css']
})
export class BanqueComponent implements OnInit {
  displayedColumns: string[] = ['Libelle',
  'Actions'];
dataSource = new MatTableDataSource<Banque>();
banques :Banque [] =[]
formbanque;
@ViewChild('myDrop', { static: true }) myDrop: NgbDropdown;
  formbanque1: FormGroup;
  placement;
  public innerWidth: number;
banque: Banque;
  constructor(private banqueService: BanqueService,public config: NgbDropdownConfig, private dialog: MatDialog) {
    this.placement= 'left-buttom';


   }
   @HostListener('window:resize', ['$event'])
   onResize(event) {
     this.innerWidth = window.innerWidth;
     console.log(typeof this.innerWidth);
     if (this.innerWidth < 840 ){
       this.placement ='buttom-rigth'
     }else{
      this.placement= 'left-buttom';

     }
   }
  ngOnInit(): void {
    this.banqueService.getallbanque();
    this.banqueService.banquesub().subscribe(res=>{
      console.log(res)
      this.banques = res;
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
      this.placement ='buttom-rigth'
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
 //this.banqueService.add(this.formbanque.value.Libelle)
console.log(this.formbanque)


    // This is the key!
    this.formbanque.reset();
    this.formbanque.markAsPristine();
    this.formbanque.markAsUntouched();


//this.myDrop.close();

}
edit(){
  if(this.formbanque1.invalid){
    return;
  }
  this.banque.libelle=this.formbanque1.value.Libelle1;
  this.banqueService.edit(this.banque)
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
    this.banqueService.delete(id);
}    });
}
patch(id){
  this.banqueService.getonebanque(id).subscribe((res=>{
    console.log(res)
    this.banque= res.banque;
    this.formbanque1.setValue({
      Libelle1 :res.banque.libelle
    })
  }))
}
}
