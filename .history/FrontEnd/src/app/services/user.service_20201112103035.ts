import { LoginService } from 'src/app/services/login.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Role } from '../models/role';
import { User } from '../models/usermodel';
import * as moment from 'moment';
import 'moment/locale/pt-br';
import { AlertService } from './alert.service';

const BACKEND_URL = environment.apiUrl + '/user/';

@Injectable({
    providedIn: 'root',

})
export class UserService {
    getoneUsersub = new Subject<User>();
    user: User;
    private allusers: User[] = []
    alluserssubject = new Subject<User[]>();
    inscriptionresponce = new Subject<{ ok: boolean, msg: string }>();
    motdepassesub = new Subject<{ msg: string, ok: boolean }>();
    constructor(private http: HttpClient, private alertService : AlertService ,
      private route: Router, private loginservice: LoginService) { }
    getallsociete() {
        return this.http.get<{ societe: User[] }>(
            BACKEND_URL + 'getallsociete'
        );


    }

    delete(id) {
        this.http.delete<{ msg: string, ok: boolean }>(BACKEND_URL + `delete/${id}`).subscribe((res => {
            console.log(res)
            if(res.ok){
                this.allusers = this.allusers.filter(u => u.ID !== id)
                this.alluserssubject.next([...this.allusers])
            }

        }))
    }
    getallusersub() {
        return this.alluserssubject.asObservable()
    }
    inscriptionsociete(
        Rs: string,
        Adresse: string,
        Tel: number,
        Fax,
        Email: string,
        Site: string,
        Matfiscale: string,
        Image: File,
        MotDePasse: string,
        Status: boolean,
        Login: string,
        roles: Role[],
        abonnement
    ) {
        console.log(abonnement)
        const societedata = new FormData();
        if (Fax !== null && Fax !=='' && Fax !==0) {
            societedata.append('Fax', Fax.toString());
        }
        if (abonnement !== undefined) {
            societedata.append('Abonnement',JSON.stringify(abonnement) )
        }
        if (roles.length!==0 ) {
            societedata.append('roles', JSON.stringify(roles));

        }
        societedata.append('Rs', Rs);
        societedata.append('Adresse', Adresse);
        societedata.append('Tel', Tel.toString());
        societedata.append('Email', Email);
        societedata.append('Site', Site);
        societedata.append('Matfiscale', Matfiscale);
        societedata.append('Image', Image);
        societedata.append('MotDePasse', MotDePasse);
        societedata.append('Status', String(Status));
        societedata.append('Login', Login);


        this.http
            .post<{ msg: string; ok: boolean }>(
                BACKEND_URL + 'add',
                societedata
            )
            .subscribe((res) => {
                this.inscriptionresponce.next({ ok: res.ok, msg: res.msg });
                console.log(res)
                if (res.ok === true) {
                    if (this.loginservice.isadmin) {
                        this.route.navigate(['/utilisateur/liste_utilisateur'])
                    } else { this.route.navigate(['/login']); }

                }else{
                  this.alertService.add('danger', res.msg, false )
                }


            });
    }
    getinscriptionresponce() {
        return this.inscriptionresponce.asObservable();
    }
    inscriptionpersonnel(
        Cin: number,
        Nom: string,
        Prenom: string,
        DateDeNaissance: Date,
        Adresse: string,
        Tel: number,
        Fax,
        Email: string,
        NumCNSS: number,
        CopierPermis: File,
        SituationFamilialle: string,
        Login: string,
        MotDePasse: string,
        Image: File,
        SocieteID: number,
        roles: Role[],
        Status,
    ) {
        console.log(roles)
        const personneldata = new FormData();
        if (Fax !== null && Fax !=='' &&Fax !==0) {
            personneldata.append('Fax', Fax.toString());
        }
        if (roles != null) {
            personneldata.append('roles', JSON.stringify(roles));

        }
        personneldata.append('Cin', Cin.toString());

        personneldata.append('Nom', Nom);
        personneldata.append('Prenom', Prenom);
        personneldata.append('DateDeNaissance', DateDeNaissance.toString());

        personneldata.append('Adresse', Adresse);
        personneldata.append('Tel', Tel.toString());
        personneldata.append('Email', Email);
        personneldata.append('NumCNSS', NumCNSS.toString());
        personneldata.append('CopierPermis', CopierPermis);
        personneldata.append('SituationFamilialle', SituationFamilialle);
        personneldata.append('MotDePasse', MotDePasse);
        personneldata.append('Login', Login);
        personneldata.append('Image', Image);
        personneldata.append('SocieteID', SocieteID.toString());
        personneldata.append('Status', String(Status));

        this.http
            .post<{ msg: string; ok: boolean }>(
                BACKEND_URL + 'add',
                personneldata
            )
            .subscribe((res) => {
                this.inscriptionresponce.next({ ok: res.ok, msg: res.msg })
                if (res.ok === true) {
                    if (this.loginservice.isadmin) {
                        this.route.navigate(['utilisateur/liste_utilisateur'])
                    } else {
                        const role = JSON.parse(localStorage.getItem('user')).roles;
                        if (this.loginservice.userhasrole(role, 'Société') || this.loginservice.userhasrole(role, 'Personnel')) {
                            this.route.navigate(['/personnel']);
                        } else {

                            this.route.navigate(['/login']);
                        }
                    }

                }else{
                  this.alertService.add('danger', res.msg, false )
                }
            });
    }
    inscriptionclient(
        Rs: string,
        Adresse: string,
        Tel: number,
        Fax,
        Email: string,
        Site: string,
        NomPC: string,
        PrenomPC: string,
        TelPersonnelContact,
        FaxPersonnelContact,
        AdresseEmailPersonnel: string,
        Matfiscale: string,
        Regfiscale: number,
        Login: string,
        MotDePasse: string,
        Image: File,
        SocieteID: number,
        roles: Role[],
        Status: boolean
    ) {
        console.log(Fax)
        const clientdata = new FormData();
        if (Fax !== null && Fax !=='' && Fax !==0) {
            clientdata.append('Fax', Fax.toString());
        }
        if (FaxPersonnelContact !== null && FaxPersonnelContact !=='' &&FaxPersonnelContact !==0) {
            clientdata.append('Fax', FaxPersonnelContact.toString());
        }
        if (Regfiscale !== null) {
            clientdata.append('Regfiscale', Regfiscale.toString());
        }
        if (TelPersonnelContact !== null &&TelPersonnelContact !=='' &&TelPersonnelContact !==0) {
            clientdata.append(
                'TelPersonnelContact',
                TelPersonnelContact.toString()
            );
        }
        if (roles.length !== 0) {
            clientdata.append('roles', JSON.stringify(roles));

        }
        clientdata.append('Rs', Rs);
        clientdata.append('Status', String(Status));

        clientdata.append('Adresse', Adresse);
        clientdata.append('Tel', Tel.toString());
        clientdata.append('Email', Email);
        clientdata.append('NomPC', NomPC);
        clientdata.append('PrenomPC', PrenomPC);


        clientdata.append('AdresseEmailPersonnel', AdresseEmailPersonnel);


        clientdata.append('Site', Site);

        clientdata.append('Matfiscale', Matfiscale);
        clientdata.append('Image', Image);
        clientdata.append('MotDePasse', MotDePasse);
        clientdata.append('Login', Login);
        clientdata.append('SocieteID', SocieteID.toString());


        this.http
            .post<{ msg: string; ok: boolean }>(BACKEND_URL + 'add', clientdata)
            .subscribe((res) => {
                this.inscriptionresponce.next({ ok: res.ok, msg: res.msg })
                console.log(res)
                if (res.ok === true) {

                    if (this.loginservice.isadmin) {
                        this.route.navigate(['/utilisateur/liste_utilisateur'])
                    } else {
                        const role = JSON.parse(localStorage.getItem('user')).roles;
                        if (this.loginservice.userhasrole(role, 'Société') || this.loginservice.userhasrole(role, 'Personnel')) {
                            this.route.navigate(['/client']);
                        } else {

                            this.route.navigate(['/login']);
                        }
                    }


                }else{
                  this.alertService.add('danger', res.msg, false )
                }
            });
    }
    getOneuser(id: string) {
        this.http
            .get<{ user: User }>(BACKEND_URL + `getonebyid/${id}`).subscribe((res => {
                this.getoneUsersub.next(res.user);
            }))

    }
    getoneusersubscribe() {
        return this.getoneUsersub.asObservable();
    }
    updatesociete(
        Rs,
        Adresse,
        Tel,
        Fax,
        Email,
        Site,
        Matfiscale,
        Image,
        MotDePasse,
        Status,
        Login,
        Function,
        userId
    ) {
        const societe: User = {
            Rs,
            Adresse,
            Tel,
            Fax,
            Email,
            Site,
            Matfiscale,
            Image,
            MotDePasse,
            Status,
            Login,
            Function,
        };
        this.http
            .put<{ msg: string, user: User, ok: boolean }>(BACKEND_URL + `update/${userId}`, societe)
            .subscribe((res) => {
                console.log(res)
                if (res.ok === true) {
                    this.getoneUsersub.next(res.user);
                    if (this.loginservice.isadmin) {
                        this.route.navigate(['/utilisateur/liste_utilisateur'])
                    } else {
                        this.route.navigate(['/login'])
                    }

                }
            });
    }
    updatepersonnel(
        Cin,
        Nom,
        Prenom,
        DateDeNaissance,

        Adresse,
        Tel,
        Fax,
        Email,
        NumCNSS,
        CopierPermis,

        SituationFamilialle,
        Login,
        Image,
        MotDePasse,
        SocieteID,
        Function,
        userId
    ) {
        const personnel: User = {
            Cin,
            Nom,
            Prenom,
            DateDeNaissance,
            Adresse,
            Tel,
            Fax,
            Email,
            Login,
            Image,
            CopierPermis,
            SituationFamilialle,
            MotDePasse,
            SocieteID,
            Function,
            NumCNSS,
        };
        this.http
            .put<{ msg: string, user: User, ok: boolean }>(BACKEND_URL + `update/${userId}`, personnel)
            .subscribe((res) => {
                console.log(res)
                if (res.ok === true) {
                    this.getoneUsersub.next(res.user);
                    if (this.loginservice.isadmin) {
                        this.route.navigate(['/utilisateur/liste_utilisateur'])
                    } else {
                        this.route.navigate(['/login'])
                    }
                }
            });
    }
    editclient(
        Rs,
        Adresse,
        Tel,
        Fax,
        Email,
        Site,
        NomPC,
        PrenomPC,
        TelPersonnelContact,
        FaxPersonnelContact,
        AdresseEmailPersonnel,
        Matfiscale,
        Regfiscale,
        Login,
        Image,
        MotDePasse,
        SocieteID,
        userId
    ) {
        const client: User = {
            Rs,
            Adresse,
            Tel,
            Fax,
            Email,
            Site,
            NomPC,
            PrenomPC,
            TelPersonnelContact,
            FaxPersonnelContact,
            AdresseEmailPersonnel,
            Matfiscale,
            Regfiscale,
            Login,
            Image,
            MotDePasse,
            SocieteID,
        };
        this.http
            .put<{ msg: string, user: User, ok: boolean }>(BACKEND_URL + `update/${userId}`, client)
            .subscribe((res) => {
                if (res.ok === true) {
                    this.getoneUsersub.next(res.user);
                    if (this.loginservice.isadmin) {
                        this.route.navigate(['/utilisateur/liste_utilisateur'])
                    } else {
                        const role = JSON.parse(localStorage.getItem('user')).roles;
                        if (this.loginservice.userhasrole(role, 'Société') || this.loginservice.userhasrole(role, 'Personnel')) {
                            this.route.navigate(['/client']);
                        }
                    }
                }
            });
    }
    changeimage(image: File, id) {
        const userdata = new FormData();

        userdata.append('Image', image);
      return  this.http
            .put<{ imagepath: any }>(
                BACKEND_URL + `updateimage/${id}`,
                userdata
            )

    }
    updateadmin(Nom,
        Prenom,
        Adresse,
        Tel,
        Fax,
        Email,
        Login,
        Image,
        MotDePasse,
        Function,
        IDuser
    ) {
        const admin: User = {
            Nom,
            Prenom,
            Adresse,
            Tel,
            Fax,
            Email,
            Login,
            Image,
            MotDePasse,
            Function


        };
        this.http
            .put<{ msg: string, user: User, ok: boolean }>(BACKEND_URL + `update/${IDuser}`, admin)
            .subscribe((res) => {
                if (res.ok === true) {
                    this.getoneUsersub.next(res.user);
                    if (this.loginservice.isadmin) {
                        this.route.navigate(['/user'])
                    } else {
                        const role = JSON.parse(localStorage.getItem('user')).roles;
                        if (this.loginservice.userhasrole(role, 'Société') || this.loginservice.userhasrole(role, 'Personnel')) {
                            this.route.navigate(['/personnel']);
                        }
                    }
                }
            });
    }
    changemotdepasse(actuelMotDePasse, nouvelleMotDePasse, id) {
        const change = { actuelMotDePasse, nouvelleMotDePasse };
        this.http.put<{ msg: string, ok: boolean }>(BACKEND_URL + `changemotdpasse/${id}`, change).subscribe((res) => {
            this.motdepassesub.next({ msg: res.msg, ok: res.ok });
        });
    }
    getmotdepassesub() {
        return this.motdepassesub.asObservable();
    }
    getalluser() {
        this.http.get<{ users: User[] }>(BACKEND_URL + 'getallusers').subscribe((res => {
            moment.locale('fr');
            res.users.forEach(user => {
                user.mombredepuis = moment(user.createdAt).fromNow();
                if (user.Dernierconnection === null) {
                    user.dernierconnection = 'jamais';
                } else {
                    user.dernierconnection = moment(user.Dernierconnection).fromNow();

                }
            });
            this.allusers = res.users;
            this.alluserssubject.next([...this.allusers]);
        }))
    }
    getusershasrole(IDsociete ,role){
   return   this.http.get<{user:User[]}>(BACKEND_URL+`getusershasrole/${IDsociete}/${role}`)
    }
}
