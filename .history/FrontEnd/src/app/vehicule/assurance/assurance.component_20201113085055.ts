import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Assurance } from 'src/app/models/assurance';
import { PrestataireAssurance } from 'src/app/models/prestataire';
import { Voiture } from 'src/app/models/voiture';
import { AssuranceService } from 'src/app/services/assurance.service';
import { PrestataireAssuranceService } from 'src/app/services/prestataire-assurance.service';
import { VoitureService } from 'src/app/services/voiture.service';

@Component({
  selector: 'app-assurance',
  templateUrl: './assurance.component.html',
  styleUrls: ['./assurance.component.css']
})
export class AssuranceComponent implements OnInit {

  voitureID;
  voiture: Voiture;
  prestataires: PrestataireAssurance[] = [];
  form;
  imagePreview;
  userID;
  assurances: Assurance[] = [];
  popoverTitle = 'Popover title';
  popoverMessage = 'Vous etes sure';
  confirmClicked = false;
  cancelClicked = false;
  DateOperation ;
          DateDebutValidite;
          DateFinValidite ;
  displayedColumns: string[] = ['Prestataire', 'DateOperation', 'DateDebutValidite', 'DateFinValidite',
      'Actions'];
  dataSource = new MatTableDataSource<Assurance>();
  constructor(private router: ActivatedRoute,public dialog: MatDialog ,private voitureservice: VoitureService,
              private datePipe: DatePipe,

              private prestataireservice: PrestataireAssuranceService, private assuranceservice: AssuranceService) { }
  @ViewChild(MatSort, { static: false }) set content(sort: MatSort) {
      this.dataSource.sort = sort;
  }
  ngOnInit(): void {
      console.log(this.DateOperation)
      this.userID = localStorage.getItem('societeId');
      this.router.paramMap.subscribe((paramMap: ParamMap) => {
          this.voitureID = paramMap.get('id');
      });
      this.voitureservice.getonevoiture(this.voitureID).subscribe((voiture) => {
          this.voiture = voiture.voiture;
      });
      this.prestataireservice.getall();
      this.prestataireservice.prestataireressub().subscribe(res => {
          this.prestataires = res;
      });
      this.assuranceservice.getallassurance(this.voitureID);
      this.assuranceservice.getallassurancesub().subscribe((res) => {
          this.assurances = res;
          this.dataSource.data = res;

      });
      this.DateOperation=this.datePipe.transform(new Date(), 'yyyy-MM-dd');
      this.DateDebutValidite=this.datePipe.transform(new Date(), 'yyyy-MM-dd');
      const actuelyears =new Date().getFullYear()
      const DateFinValidite =new Date().setFullYear(actuelyears+1)
      this.DateFinValidite=this.datePipe.transform(DateFinValidite, 'yyyy-MM-dd');
      this.form = new FormGroup({
          prestataireassuranceID: new FormControl('', { validators: [Validators.required] }),
          DateOperation: new FormControl(this.DateOperation, { validators: [Validators.required] }),
          DateDebutValidite: new FormControl(this.DateDebutValidite, { validators: [Validators.required] }),
          DateFinValidite: new FormControl(this.DateFinValidite, { validators: [Validators.required] }),
          CopierAssurance: new FormControl('', { validators: [Validators.required] }),
          Montant: new FormControl('', { validators: [Validators.required] }),

      });

      console.log(this.DateOperation)
  }

  public doFilter = (value: string) => {
      this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
  onImagePicked(e) {
      const file = (e.target as HTMLInputElement).files[0];
      this.form.patchValue({ CopierAssurance: file });
      this.form.get('CopierAssurance').updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = () => {
          this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
  }
  supprimerimage() {
      this.imagePreview = null;
      this.form.patchValue({ CopierAssurance: '' });
  }
  enregistre() {
    console.log(this.form.value)
      if (this.form.invalid) {
          return;
      }
      const assurance: Assurance = {
          prestataireassuranceID: this.form.value.prestataireassuranceID,

          DateOperation: this.form.value.DateOperation,
          DateDebutValidite: this.form.value.DateDebutValidite,
          DateFinValidite: this.form.value.DateFinValidite,
          CopierAssurance: this.form.value.CopierAssurance,
          Montant: this.form.value.Montant,
          voitureID: this.voitureID,
          userID: this.userID
      };
      this.assuranceservice.ajoute(assurance);
      this.assuranceservice.getresponcesub().subscribe(res => {
          if (res.ok === true) {
              this.DateOperation=this.datePipe.transform(new Date(), 'yyyy-MM-dd');
              this.DateDebutValidite=this.datePipe.transform(new Date(), 'yyyy-MM-dd');
              const actuelyears =new Date().getFullYear()
              const DateFinValidite =new Date().setFullYear(actuelyears+1)
              this.DateFinValidite=this.datePipe.transform(DateFinValidite, 'yyyy-MM-dd');
              this.form.get('prestataireassuranceID').setValue('')
              this.form.get('DateOperation').setValue(this.DateDebutValidite)
              this.form.get('DateDebutValidite').setValue(this.DateDebutValidite)
              this.form.get('DateFinValidite').setValue(this.DateFinValidite)
              this.form.get('CopierAssurance').setValue('')

              this.form.controls['prestataireassuranceID'].setErrors(null);
              this.form.get('Montant').setValue('')
              this.form.controls['Montant'].setErrors(null);
              this.imagePreview = null;
          }
      });
  }
  supprimer(id) {
this.assuranceservice.delete(id)
  }
  openDialog(id): void {
  /*    const dialogRef = this.dialog.open(AfficheAssuranceComponent, {
          width: '650px',
          height:'350px',
        data: {ID: id}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');

      });*/
    }
}
