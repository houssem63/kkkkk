import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Banque } from '../models/banque';
const BACKEND_URL = environment.apiUrl + '/banque/';

@Injectable({
  providedIn: 'root'
})
export class BanqueService {
  banques: Banque[] = []
  getallbanquesub = new Subject<Banque[]>()
  constructor(private http: HttpClient, private route: Router) { }
  getallbanque() {
    this.http.get<{ banque: Banque[] }>(BACKEND_URL + 'getall').subscribe((res) => {
      this.banques = res.banque;
      this.getallbanquesub.next([...this.banques])
    })
  }
  banquesub() {
    return this.getallbanquesub.asObservable()
  }
  baquesdata() {
    return this.banques;
  }
  add(libelle){
    this.http.post<{banque : Banque}>(BACKEND_URL + 'add',{libelle}).subscribe(res => {

      this.banques.push(res.banque);
      this.getallbanquesub.next([...this.banques]);

    })
  }
  delete(id){
    console.log(id)
    this.http.delete(BACKEND_URL + `delete/${id}`).subscribe((res => {
this.banques =this.banques.filter(b=> b.ID !== id);
this.getallbanquesub.next([...this.banques]);

}))
  }
  getonebanque(id){
    return this.http.get<{banque: Banque}>(BACKEND_URL + `getonebyid/${id}`);
  }
}
