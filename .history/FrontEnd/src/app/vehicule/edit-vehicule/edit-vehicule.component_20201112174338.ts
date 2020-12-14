import { AlertService } from './../../services/alert.service';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Marquevoiture } from 'src/app/models/marquevoiture';
import { VoitureService } from 'src/app/services/voiture.service';

@Component({
  selector: 'app-edit-vehicule',
  templateUrl: './edit-vehicule.component.html',
  styleUrls: ['./edit-vehicule.component.css']
})
export class EditVehiculeComponent implements OnInit {
title='Ajout vehicule'
cartegrissePreview=null;
    form;
    copiercontratPreview=null;
    userID;
    voitureressub;
    msg;
    ok;
    mode = 'create'
    marques: Marquevoiture[] = [];
    voitureID;
    constructor(private voitureservice: VoitureService, private datePipe: DatePipe,
                private route: Router, private router: ActivatedRoute,private alertService:AlertService) { }

    ngOnInit(): void {
        this.userID = JSON.parse(localStorage.getItem('user')).ID;;
        this.voitureservice.getallmarque();
        this.voitureservice.marquesubscribe().subscribe(res => {
            this.marques = res;
        })
        this.form = new FormGroup({
            Matricule: new FormControl('', {
                validators: [Validators.required]
            }),
            Type: new FormControl('', { validators: [Validators.required] }),
            DPMC: new FormControl('', { validators: [Validators.required] }),
            Marque: new FormControl('', { validators: [Validators.required] }),
            Categorie: new FormControl('', { validators: [Validators.required] }),
            Compteur: new FormControl('', { validators: [Validators.required] }),
            Propritaire: new FormControl('', { validators: [Validators.required] }),
            CopierContrat: new FormControl('', { validators: [Validators.required] }),
            CopierCarteGrise: new FormControl('', { validators: [Validators.required] }),
        });
        this.router.paramMap.subscribe((paramMap: ParamMap) => {
            if (paramMap.has('id')) {
                this.mode = 'edit';
                this.voitureID = paramMap.get('id');
                this.voitureservice.getonevoiture(this.voitureID).subscribe((res) => {
                    console.log(res)
                    const date1 = new Date(
                        res.voiture.DPMC
                    );
                    this.form.setValue({
                        Matricule: res.voiture.Matricule,
                        Type: res.voiture.Type,
                        DPMC: this.datePipe.transform(
                            date1,
                            'yyyy-MM-dd'
                        ),
                        Marque: res.voiture.Marque,
                        Categorie: res.voiture.Categorie,
                        Compteur: res.voiture.Compteur,
                        Propritaire: res.voiture.Propritaire,
                        CopierContrat: res.voiture.CopierContrat,
                        CopierCarteGrise: res.voiture.CopierCarteGrise
                    })
                    this.cartegrissePreview =res.voiture.CopierCarteGrise;
                    this.copiercontratPreview =res.voiture.CopierContrat;
                })


            }
        });

    }
    onCategrissePicked(e) {
        const file = (e.target as HTMLInputElement).files[0];
        console.log(file);
        this.form.patchValue({ CopierCarteGrise: file });
        this.form.get('CopierCarteGrise').updateValueAndValidity();
        const reader = new FileReader();
        reader.onload = () => {
            this.cartegrissePreview = reader.result as string;
        };
        reader.readAsDataURL(file);
    }
    oncopiercontratPicked(e) {
        const file = (e.target as HTMLInputElement).files[0];
        console.log(file);
        this.form.patchValue({ CopierContrat: file });
        this.form.get('CopierContrat').updateValueAndValidity();
        const reader = new FileReader();
        reader.onload = () => {
            this.copiercontratPreview = reader.result as string;
        };
        reader.readAsDataURL(file);
    }
    enregistre() {
console.log(this.form)

        if (this.form.invalid) {
            return;
        }
if (this.mode === 'create') {
            this.voitureservice.ajoute(
                this.form.value.Matricule,
                this.form.value.Type,
                this.form.value.DPMC,
                this.form.value.Marque,
                this.form.value.Categorie,
                this.form.value.Compteur,
                this.form.value.Propritaire,
                this.form.value.CopierContrat,
                this.form.value.CopierCarteGrise,
                this.userID);
            this.voitureservice.voitureesponce().subscribe(res => {
              console.log(res)
              this.msg = res.msg;
              this.ok = res.ok;
              if (res.ok === true) {
                    this.form.reset();
                    setTimeout(() => {

                        this.route.navigate(['/vehicule/liste_vehicule']);
                    }, 100);
                }else{
                  this.alertService.add('danger', res.msg, true )

                }
            });
        } else {
           this.voitureservice.edit(
                this.form.value.Matricule,
                this.form.value.Type,
                this.form.value.DPMC,
                this.form.value.Marque,
                this.form.value.Categorie,
                this.form.value.Compteur,
                this.form.value.Propritaire,
                this.form.value.CopierContrat,
                this.form.value.CopierCarteGrise,
                this.userID,
                this.voitureID);
           this.voitureservice.voitureesponce().subscribe(res => {
                this.msg = res.msg;
                this.ok = res.ok;
                if (res.ok === true) {
                    this.form.reset();
                    setTimeout(() => {
                        this.route.navigate(['/voiture']);
                    }, 100);
                }
            });
        }

    }
    supprimercopiercontrat(){
      this.copiercontratPreview=null;
      this.form.patchValue({ CopierContrat: '' });

    }
    supprimercartegris(){
      this.cartegrissePreview=null;
      this.form.patchValue({ CopierCarteGrise: '' });

    }
    touppercase(event){
      console.log(event)
    }
}
