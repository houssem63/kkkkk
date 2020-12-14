import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Voiture } from 'src/app/models/voiture';
import { VoitureService } from 'src/app/services/voiture.service';

@Component({
  selector: 'app-view-vehicule',
  templateUrl: './view-vehicule.component.html',
  styleUrls: ['./view-vehicule.component.css']
})
export class ViewVehiculeComponent implements OnInit {

  voiture :Voiture;
  constructor(private voitureservice :VoitureService,
      public dialogRef: MatDialogRef<ViewVehiculeComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any) {}

    onNoClick(): void {
      this.dialogRef.close();
    }
ngOnInit(): void {
    console.log(this.data.VoitureID)
    this.voitureservice.getonevoiture(this.data.VoitureID).subscribe((voiture)=>{
this.voiture =voiture.voiture;
    })
}
}
