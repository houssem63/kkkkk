import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Compte } from '../models/compte';
import { BanqueService } from './banque.service';
const BACKEND_URL = environment.apiUrl + '/compte/';

@Injectable({
    providedIn: 'root'
})
export class CompteService {
    private comptes: Compte[] = [];
    private comptesub = new Subject<Compte[]>();
    constructor(private http: HttpClient, private route: Router) { }
    ajoutercompte(c: Compte) {
        this.http.post<{ compte: Compte }>(BACKEND_URL + 'add', c).subscribe((res) => {
          //  c.ID = res.compte.ID;
            this.comptes.push(res.compte);
            this.comptesub.next([...this.comptes]);
        });
    }
    getallcompteuser(id) {
        this.http.get<{ compte: Compte[] }>(BACKEND_URL + `getall/${id}`).subscribe((res) => {

            this.comptes = res.compte;

            this.comptesub.next([...this.comptes]);
        });
    }
    getcomptesub() {
        return this.comptesub.asObservable();
    }
}
