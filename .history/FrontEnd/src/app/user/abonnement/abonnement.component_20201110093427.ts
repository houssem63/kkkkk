import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Abonnement } from 'src/app/models/abonnement';
import { Alert } from 'src/app/models/alert';
import { DureeAbonnement } from 'src/app/models/durreabonnement';
import { AbonnementService } from 'src/app/services/abonnement.service';
import { DureeAbonnementtab, fraisMonsuelAbonnement } from 'src/environments/environment';

@Component({
  selector: 'app-abonnement',
  templateUrl: './abonnement.component.html',
  styleUrls: ['./abonnement.component.css'],
})
export class AbonnementComponent implements OnInit {

  form;
  alerts:Alert[]=[]
  fraisMonsuelAbonnement = fraisMonsuelAbonnement;
  dureeabonnement: DureeAbonnement[] = DureeAbonnementtab;
  constructor(
      public dialogRef: MatDialogRef<AbonnementComponent>, private abonnentservice: AbonnementService,
      @Inject(MAT_DIALOG_DATA) public data: any, private datePipe: DatePipe) { }

  onNoClick(): void {
      this.dialogRef.close();
  }

  ngOnInit(): void {
      console.log(this.data);
      this.form = new FormGroup({
          DateDebut: new FormControl('', [Validators.required]),
          //        DateFin: new FormControl('', [Validators.required]),
          Montant: new FormControl({ value: '', disabled: true }, [Validators.required]),
          Period: new FormControl('', [Validators.required])
      });
      this.abonnentservice.getallabonnement(this.data.ID).subscribe((res => {
          let datedebut;
          const tablength = res.abonnement.length;
          if (res.abonnement.length !== 0) {
              datedebut = new Date(res.abonnement[tablength - 1].DateFin)
              datedebut =datedebut.setDate(datedebut.getDate()+1)
              this.form.get('DateDebut').setValue(this.datePipe.transform(datedebut, 'yyyy-MM-dd'));

          } else {
              datedebut = new Date();
              this.form.get('DateDebut').setValue(this.datePipe.transform(datedebut, 'yyyy-MM-dd'));


          }

      }));
  }
  ajouteabonnemnt() {
      if (this.form.invalid) {
          return;
      }


      let datefin = new Date(this.form.value.DateDebut);
      datefin = new Date(datefin.setMonth(datefin.getMonth() + this.form.value.Period));
      const abonnement: Abonnement = {
          DateDebut: this.form.value.DateDebut,
          DateFin: datefin,
          Montant: this.form.get('Montant').value,
          Duree : this.form.get('Period').value
      };
      this.abonnentservice.ajoute(abonnement, this.data.ID).subscribe((res=>{
          console.log(res)
          if(res.ok ===true){

              this.dialogRef.close();
          } else {



          }

      }))
  }
  patchprix(v) {
      this.form.get('Montant').setValue('');

      const free = (Number(v.source.value) * this.fraisMonsuelAbonnement);
      this.form.get('Montant').setValue(free.toFixed(3));

  }
  close(alert: Alert) {
      this.alerts.splice(this.alerts.indexOf(alert), 1);
  }
}
