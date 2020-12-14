import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PrestataireAssurance } from '../models/prestataire';
import { PrestataireAssuranceService } from '../services/prestataire-assurance.service';

@Component({
  selector: 'app-prestataire-assurance',
  templateUrl: './prestataire-assurance.component.html',
  styleUrls: ['./prestataire-assurance.component.css']
})
export class PrestataireAssuranceComponent implements OnInit {

  form;
  prestataireressub;
  constructor(private prestataireservice: PrestataireAssuranceService) { }
  TelPattern = '[0-9]{8}';
  prestataires: PrestataireAssurance[] = [];
  active = false;
  mode = 'create';
  prestataireID;
  msg;
  ok;
  ngOnInit(): void {
      this.prestataireservice.getall();
      this.prestataireressub = this.prestataireservice.prestataireressub().subscribe((res) => {
          this.prestataires = res;
      })
      this.form = new FormGroup({
          Libelle: new FormControl('', { validators: [Validators.required] }),
          Site: new FormControl('', { validators: [] }),
          Adresse: new FormControl('', { validators: [Validators.required] }),
          Tel: new FormControl('', { validators: [Validators.required, Validators.pattern(this.TelPattern)] }),
      });
  }
  enregistre() {
      if (this.form.invalid) {
          return;
      }

      if (this.mode === 'create') {
          const prestataire: PrestataireAssurance = {
              Libelle: this.form.value.Libelle,
              Adresse: this.form.value.Adresse,
              Site: this.form.value.Site,
              Tel: this.form.value.Tel
          };
          this.prestataireservice.ajoute(prestataire);
          this.form.reset();
      } else {
          const prestataire: PrestataireAssurance = {
              ID : this.prestataireID,
              Libelle: this.form.value.Libelle,
              Adresse: this.form.value.Adresse,
              Site: this.form.value.Site,
              Tel: this.form.value.Tel
          };
          this.prestataireservice.edit(prestataire, this.prestataireID);
          this.form.resert();

      }
      this.active = !this.active;

  }
  edit(id) {
      this.active = true;
      this.mode = 'edit';
      this.prestataireID = id;
      this.prestataireservice.getone(id).subscribe((res) => {
          console.log(res)
          this.form.setValue({
              Libelle: res.prestataire?.Libelle,
              Adresse: res.prestataire?.Adresse,
              Site: res.prestataire?.Site,
              Tel: res.prestataire?.Tel
          });
      });
  }
  delete(id){
      this.prestataireservice.delete(id)
      this.prestataireservice.getresmsh().subscribe(res=>{
this.msg =res.msg;
this.ok =res.ok;
      })
      setTimeout(() => {
          this.msg=null;
          this.ok =null;
      }, 3000);
  }
  ngOnDestroy() {
      this.prestataireressub.unsubscribe();
  }
}
