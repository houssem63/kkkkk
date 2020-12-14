import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Banque } from 'src/app/models/banque';
import { Compte } from 'src/app/models/compte';
import { BanqueService } from 'src/app/services/banque.service';
import { CompteService } from 'src/app/services/compte.service';

@Component({
  selector: 'app-add-compte',
  templateUrl: './add-compte.component.html',
  styleUrls: ['./add-compte.component.css']
})
export class AddCompteComponent implements OnInit {

  banques: Banque[] = [];
    form;
    baquenom;
    constructor(
        public dialogRef: MatDialogRef<AddCompteComponent>,
        private banqueservice: BanqueService, private compteservice: CompteService,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

    ngOnInit(): void {
        this.banqueservice.getallbanque();
        this.banqueservice.banquesub().subscribe((res) => {
            this.banques = res;
        });
        this.form = new FormGroup({
            banqueID: new FormControl('', {
                validators: [Validators.required]
            }),
            RIB: new FormControl('', {
                validators: [Validators.required]
            }),
        });
        if(this.data.Mode ==='edit'){
this.compteservice.getonecompte(this.data.IDuser).subscribe((res=>{
  console.log(res)
this.form.setValue({
  RIB :res.compte.RIB,
  banqueID:res.compte.banqueID
})
}))
        }
    }
    enregister() {
        if (this.form.invalid) {
            return;
        }


        const compte: Compte = {
                RIB: this.form.value.RIB,
                banqueID: this.form.value.banqueID,
                userID: this.data.IDuser,


            };
            if(this.data.Mode ==='create'){
              this.compteservice.ajoutercompte(compte);

            }else{
              this.compteservice.update(compte)
            }

        this.onNoClick();

    }

}
