import { Component, OnInit } from '@angular/core';
import { BanqueService } from '../services/banque.service';

@Component({
  selector: 'app-banque',
  templateUrl: './banque.component.html',
  styleUrls: ['./banque.component.css']
})
export class BanqueComponent implements OnInit {

  constructor(private banqueService: BanqueService) { }

  ngOnInit(): void {
    this.banqueService.getallbanque();
    this.banqueService.banquesub().subscribe(res=>{
      console.log(res)
    })
  }

}
