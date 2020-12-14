import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ModePaiement } from '../models/modepaiement';
const BACKEND_URL = environment.apiUrl + '/modepaiement/';

@Injectable({
  providedIn: 'root'
})
export class ModePaiementService {

  modepaiements: ModePaiement[] = []
  getallmodesub = new Subject<ModePaiement[]>()
  constructor(private http: HttpClient, private route: Router) { }
  getallbanque() {
    this.http.get<{ mode: ModePaiement[] }>(BACKEND_URL + 'getall').subscribe((res) => {
      this.modepaiements = res.mode;
      console.log(res)
      this.getallmodesub.next([...this.modepaiements])
    })
  }
  banquesub() {
    return this.getallmodesub.asObservable()
  }
  baquesdata() {
    return this.modepaiements;
  }
  add(libelle){
    this.http.post<{mode : ModePaiement}>(BACKEND_URL + 'add',{libelle}).subscribe(res => {

      this.modepaiements.push(res.mode);
      this.getallmodesub.next([...this.modepaiements]);

    })
  }
  delete(id){
    console.log(id)
    this.http.delete(BACKEND_URL + `delete/${id}`).subscribe((res => {
this.modepaiements =this.modepaiements.filter(b=> b.ID !== id);
this.getallmodesub.next([...this.modepaiements]);

}))
  }
  getonebanque(id){
    return this.http.get<{mode: ModePaiement}>(BACKEND_URL + `getonebyid/${id}`);
  }
  edit(mode:ModePaiement){
    this.http.put<{ok:boolean ,msg:string}>(BACKEND_URL+`update/${mode.ID}`,mode).subscribe((res=>{
if(res.ok ===true){
  const updatebanque = [...this.modepaiements];
  const oldbanque = updatebanque.findIndex(b => b.ID === mode.ID);
  updatebanque[oldbanque] = mode;
  this.modepaiements = updatebanque;
  this.getallmodesub.next([...this.modepaiements]);
}
    }))
  }
}
