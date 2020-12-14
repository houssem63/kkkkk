import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Voiture } from '../models/voiture';
import { VoitureService } from '../services/voiture.service';

@Component({
  selector: 'app-vehicule',
  templateUrl: './vehicule.component.html',
  styleUrls: ['./vehicule.component.css']
})
export class VehiculeComponent implements OnInit,AfterViewInit ,OnDestroy{

  voitures: Voiture[] = [];
    voituresub;
    societeID;


       voitureID;
       dataSource = new MatTableDataSource<Voiture>();
       columnsToDisplay = ['ID', 'Matricule', 'Actions'];
  expandedElement: Voiture | null;
    constructor(private voitureservice: VoitureService,public dialog: MatDialog) { }
    @ViewChild(MatSort, {static: false}) set content(sort: MatSort) {
        this.dataSource.sort = sort;
      }
    ngOnInit(): void {
        this.societeID = JSON.parse(localStorage.getItem('user')).ID;
        this.voitureservice.getallvoitureofsociete(this.societeID);
        this.voituresub = this.voitureservice.voituresubscribe().subscribe((voiture) => {
            this.voitures = voiture;
            this.dataSource.data = voiture;
        });
    }
   ngAfterViewInit(): void {

      }
      public doFilter = (value: string) => {
        this.dataSource.filter = value.trim().toLocaleLowerCase();
      }
      supprimer(id) {
    this.voitureservice.delete(id)
        }
affiche(e){
    console.log(e)
}

    ngOnDestroy() {
        this.voituresub.unsubscribe();
    }
    openDialog(voitureID): void {
        /*const dialogRef = this.dialog.open(AfficheVoitureComponent, {
          width: '650px',
          height:'450px',
          data: {VoitureID :voitureID}
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            });*/
    }
}
