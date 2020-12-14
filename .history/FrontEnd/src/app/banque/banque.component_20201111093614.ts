import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { NgbDropdown, NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { Banque } from '../models/banque';
import { BanqueService } from '../services/banque.service';

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

  constructor(private banqueService: BanqueService,public config: NgbDropdownConfig) {
    config.placement = 'left-buttom';

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

  }
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
  save(){
if(this.formbanque.invalid){
  return;
}
this.banqueService.add(this.formbanque.value.Libelle)
this.myDrop.close();

}
}
