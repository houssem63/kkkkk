import { MatDialog } from '@angular/material/dialog';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { Entretien } from '../models/entretien';
import { EntretienService } from '../services/entretien.service';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../tools/confirm/confirm-dialog.component';

@Component({
  selector: 'app-entretien',
  templateUrl: './entretien.component.html',
  styleUrls: ['./entretien.component.css']
})
export class EntretienComponent implements OnInit {

  form;
  entretiens: Entretien[] = [];
  entretiensub;
  form1;
  popoverTitle = 'Popover title';
  popoverMessage = 'Vous etes sure';
  confirmClicked = false;
  cancelClicked = false;
  entretienID;
  displayedColumns: string[] = ['ID', 'Libelle', 'Actions'];
  dataSource = new MatTableDataSource<Entretien>();
  placement: string;
  innerWidth: number;
  constructor(private entretienservice: EntretienService,config: NgbDropdownConfig ,private dialog:MatDialog) {
    this.placement= 'left-buttom';
}
  @ViewChild(MatSort, { static: false }) set content(sort: MatSort) {
      this.dataSource.sort = sort;
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
      this.entretienservice.getall();
      this.entretiensub = this.entretienservice.getentretiensub().subscribe((res => {
          this.entretiens = res;
          console.log(res)
          this.dataSource = new MatTableDataSource(this.entretiens);

      }))
      this.form = new FormGroup({
          Libelle: new FormControl(null, [
              Validators.required,
          ])
      });
      this.form1 = new FormGroup({
          Libelle1: new FormControl(null, [
              Validators.required,
          ])
      })
      this.innerWidth = window.innerWidth;
      if (this.innerWidth < 840 ){
      this.placement ='bottom-right'
    }else{
     this.placement= 'left-buttom';

    }
  }
  public doFilter = (value: string) => {
      this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
  supprimer(id) {
      this.entretienservice.delete(id);
  }
  enregiste() {
      console.log(this.form.value)
      if(this.form.invalid){
          return ;
      }
      const entretien: Entretien = {
          Libelle: this.form.get('Libelle').value,
      }
      this.entretienservice.add(entretien)
      this.form.reset()
  }
  patch(id) {
      this.entretienID = id;
      const entretien = this.entretiens.find(p => p.ID === id);
      this.form1.setValue({
          Libelle1: entretien?.Libelle
      });
  }
  edite() {
      const entretien: Entretien = {
          ID: this.entretienID,
          Libelle: this.form1.get('Libelle1').value,
      }
      this.entretienservice.edit(entretien, this.entretienID);
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
    this.entretienservice.delete(id)
  }    });
  }

}
