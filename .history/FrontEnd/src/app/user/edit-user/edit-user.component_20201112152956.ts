import { RoleService } from 'src/app/services/role.service';
import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Abonnement } from 'src/app/models/abonnement';
import { Alert } from 'src/app/models/alert';
import { DureeAbonnement } from 'src/app/models/durreabonnement';
import { Role } from 'src/app/models/role';
import { User } from 'src/app/models/usermodel';
import { AbonnementService } from 'src/app/services/abonnement.service';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

import { DureeAbonnementtab, fraisMonsuelAbonnement } from 'src/environments/environment';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ImagezoomComponent } from 'src/app/tools/imagezoom/imagezoom.component';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  @Input() public IDuser: string;
  formsociete: FormGroup;
  public dialogRef: MatDialogRef<ImagezoomComponent>;

  formpersonnel: FormGroup;
  formclient: FormGroup;
  title = 'Ajout utilisateur';
  CinPattern = '[0-9]{8}';
  EmailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  urlpatter = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
  imagePreviewUser = null;
  imagePreviewsociete = null;
  imagePreviewclient = null;
  imagePreviewpersonnel = null;
  imagePreviewcopierpermis = null;
  isadmin;
  user;
  isauth;
  fraisMonsuelAbonnement = fraisMonsuelAbonnement;
  dureeAbonnement: DureeAbonnement[] = DureeAbonnementtab;

  societesList: User[] = [];
  roles: Role[] = [];
  alerts: Alert[] = [];
  userRole: Role[] = [];
  userID = null;
  abonnemntID = null;
  public Userfunction = 'Société';
  userstatus = false;

  imagechangeetat = false;
  constructor(private userService: UserService, private abonnentservice: AbonnementService,
    public roleservices: RoleService, public loginservice: LoginService, public dialog: MatDialog,

    private route: ActivatedRoute, private datePipe: DatePipe,
  ) { }

  ngOnInit(): void {
    //this.Userfunction = this.route.snapshot.paramMap.get('role')
    this.roleservices.getallRole();

    this.roleservices.getRolesub().subscribe((res => {
      console.log(res)
      this.roles = res;

      if (!this.route.snapshot.paramMap.get('id')) {
        console.log(this.route.snapshot.paramMap.get('role') === 'null')
        if (this.route.snapshot.paramMap.get('role') === 'null') {

          console.log(this.Userfunction);
          const roledebut = this.roles.find(r => r.Libelle === this.Userfunction);
          console.log(roledebut)
          roledebut.Etat = true;
          roledebut.BI = 'i'
          this.userRole.push(roledebut);
          console.log(this.userRole);
        }

      }


    }));




    if (this.route.snapshot.paramMap.get('role') !== 'null') {
      this.Userfunction = this.route.snapshot.paramMap.get('role');
      if (this.route.snapshot.paramMap.get('role') === 'Personnel') {
        this.Userfunction = this.route.snapshot.paramMap.get('role');

        this.changeform('initformpersonnel', this.route.snapshot.paramMap.get('role'));
      } else if (this.route.snapshot.paramMap.get('role') === 'Client') {
        this.Userfunction = this.route.snapshot.paramMap.get('role');

        this.changeform('initformclient', this.route.snapshot.paramMap.get('role'));


      }

    } else {
      console.log('!!!!')
      this.Userfunction = this.route.snapshot.paramMap.get('role')

      this.changeform('initformsociete', this.route.snapshot.paramMap.get('role'))
    }

    if (this.IDuser) {
      console.log(this.IDuser)
      this.userID = this.IDuser;

    }
    //;
    this.isadmin = this.loginservice.isadmin;
    this.isauth = this.loginservice.IsAuth;
    if (!this.isauth) {
      this.title = 'Inscription';
    } else {
      this.title = 'Ajout société';
    }
    this.userService.getallsociete().subscribe((res) => {
      this.societesList = res.societe;
    });



    if (this.route.snapshot.paramMap.get('id') || this.IDuser !== undefined) {

      this.userID = this.route.snapshot.paramMap.get('id') || this.userID;

      this.userService.getOneuser(this.userID)
      this.userService.getoneusersubscribe().subscribe((res => {
        this.user = res;
        this.title = 'Edit';
        this.user.roles = this.user.roles.sort((a, b) => a.Poids - b.Poids)
        const role = this.user.roles[0]
        let DateDebut = new Date();
        let Montant = null;
        let Period = null;
        if (role.Libelle === 'Société') {
          this.title = 'Modification société';
          this.formsociete.get('MotDePasse').clearValidators();
          this.imagePreviewsociete = res.Image;
          res.roles.forEach((r: Role) => {
            r.BI = 'b';
            r.Etat = true;
            this.userRole.push(r);
          });

          if (res.abonnements.length !== 0) {

            this.abonnemntID = res.abonnements[res.abonnements.length - 1].ID;

            DateDebut = res.abonnements[res.abonnements.length - 1].DateDebut,
              Montant = res.abonnements[res.abonnements.length - 1].Montant.toFixed(3),
              Period = res.abonnements[res.abonnements.length - 1].Duree;
          }
          this.formsociete.setValue({
            Rs: res.Rs,
            Adresse: res.Adresse,
            Email: res.Email,
            Tel: res.Tel,
            Fax: res.Fax,
            Login: res.Login,
            Site: res.Site,
            Status: res.Status,
            Matfiscale: res.Matfiscale,
            Image: res.Image,
            MotDePasse: '',
            DateDebut: this.datePipe.transform(DateDebut, 'yyyy-MM-dd'),
            Montant,
            Period
          })
        } else if (role.Libelle === 'Personnel') {
          this.initFormPersonnel();
          this.title = 'Modification personnel';
          this.Userfunction = 'Personnel';
          this.imagePreviewcopierpermis = res.CopierPermis;
          res.roles.forEach((r: Role) => {
            r.BI = 'b';
            r.Etat = true;
            this.userRole.push(r);
          });
          this.formpersonnel.get('MotDePasse').clearValidators();

          const DateDeNaissance = new Date(
            res.DateDeNaissance
          );
          this.formpersonnel.setValue({
            Cin: res.Cin,
            Nom: res.Nom,
            Prenom: res.Prenom,
            DateDeNaissance: this.datePipe.transform(
              DateDeNaissance,
              'yyyy-MM-dd'),
            Adresse: res.Adresse,
            Tel: res.Tel,
            Fax: res.Fax,
            Email: res.Email,
            NumCNSS: res.NumCNSS,
            CopierPermis: res.CopierPermis,
            SituationFamilialle: res.SituationFamilialle,
            MotDePasse: res.MotDePasse,
            Image: res.Image,
            Login: res.Login,
            SocieteID: res.SocieteID
          })
        } else if (role.Libelle === 'Client') {
          this.initFormclient();
          res.roles.forEach((r: Role) => {
            r.BI = 'b';
            r.Etat = true;
            this.userRole.push(r);
          });
          this.title = 'Modification client';
          this.formclient.get('MotDePasse').clearValidators();
          this.Userfunction = 'Client',
            this.imagePreviewclient = res.Image;
          this.formclient.setValue({
            Image: res.Image,

            Rs: res.Rs,
            Adresse: res.Adresse,
            Tel: res.Tel,
            Fax: res.Fax,
            Email: res.Email,
            Site: res.Site,
            NomPC: res.NomPC,
            PrenomPC: res.PrenomPC,
            TelPersonnelContact: res.TelPersonnelContact,
            FaxPersonnelContact: res.FaxPersonnelContact,
            AdresseEmailPersonnel: res.AdresseEmailPersonnel,
            Matfiscale: res.Matfiscale,
            Regfiscale: res.Regfiscale,
            Login: res.Login,
            MotDePasse: res.MotDePasse,

            SocieteID: res.SocieteID
          })
        } else {
          window.alert('formulaire pas pret')
          return;
        }


      }));
    }
  }
  triUserRole(roles: Role[]) {

  }

  registersociete() {

    if (this.formsociete.invalid) {
      return;
    }



    if (this.isadmin) {
      if (this.abonnemntID !== null) {
        let datefin = new Date(this.formsociete.value.DateDebut);
        datefin = new Date(datefin.setMonth(datefin.getMonth() + this.formsociete.value.Period));
        const abonnement: Abonnement = {
          ID: this.abonnemntID,
          DateDebut: this.formsociete.value.DateDebut,
          DateFin: datefin,
          Montant: this.formsociete.get('Montant').value,
          Duree: this.formsociete.get('Period').value
        };
        this.abonnentservice.edit(abonnement).subscribe((res => {

        }));
      }
    }



    if (this.userID !== null) {
      var image = null;
      if (this.userRole.length !== 0) {

        this.roleservices.adduserrole(this.userRole, this.userID);
      }



      if (this.imagechangeetat) {
        image = this.formsociete.value.Image;

      }
      this.userService.updatesociete(
        this.formsociete.value.Rs,
        this.formsociete.value.Adresse,
        this.formsociete.value.Tel,
        this.formsociete.value.Fax,
        this.formsociete.value.Email,
        this.formsociete.value.Site,
        this.formsociete.value.Matfiscale,
        image,
        this.user.MotDePasse,
        this.formsociete.value.Status,
        this.formsociete.value.Login,
        this.user.Function,
        this.userID

      );
      this.userService.getinscriptionresponce().subscribe((res => {


      }))
    } else {
      let abonnement: Abonnement;
      if (this.formsociete.value.Period !== null && this.formsociete.value.Montant !== null
        && this.formsociete.value.Period !== '' && this.formsociete.value.Montant !== '') {
        let datefin = new Date(this.formsociete.value.DateDebut);
        datefin = new Date(datefin.setMonth(datefin.getMonth() + this.formsociete.value.Period));
        abonnement = {
          DateDebut: this.formsociete.value.DateDebut,
          DateFin: datefin,
          Montant: this.formsociete.get('Montant').value,
          Duree: this.formsociete.get('Period').value
        };
        // this.abonnentservice.ajoute(abonnement, this.userID).subscribe((res => {

        //  })


      }
      this.userService.inscriptionsociete(this.formsociete.value.Rs,
        this.formsociete.value.Adresse,
        this.formsociete.value.Tel,
        this.formsociete.value.Fax,
        this.formsociete.value.Email,
        this.formsociete.value.Site,
        this.formsociete.value.Matfiscale,
        this.formsociete.value.Image,
        this.formsociete.value.MotDePasse,
        this.userstatus,
        this.formsociete.value.Login,
        this.userRole,
        abonnement);


    }


    this.userService.getinscriptionresponce().subscribe((res => {



    }));

  }



  registerclient() {
    if (this.formclient.invalid) {
      return;
    }

    if (this.userID !== null) {
      if (this.userRole.length !== 0) {

        this.roleservices.adduserrole(this.userRole, this.userID);
      }
      var image = null;

      if (this.imagechangeetat) {
        image = this.formsociete.value.Image;

      }

    } else {
      this.userService.inscriptionclient(this.formclient.value.Rs,
        this.formclient.value.Adresse,
        this.formclient.value.Tel,
        this.formclient.value.Fax,
        this.formclient.value.Email,
        this.formclient.value.Site,
        this.formclient.value.NomPC,
        this.formclient.value.PrenomPC,
        this.formclient.value.TelPersonnelContact,
        this.formclient.value.FaxPersonnelContact,
        this.formclient.value.AdresseEmailPersonnel,
        this.formclient.value.Matfiscale,
        this.formclient.value.Regfiscale,
        this.formclient.value.Login,
        this.formclient.value.MotDePasse,
        this.formclient.value.Image,
        this.formclient.value.SocieteID,
        this.userRole,
        this.userstatus,
      );
      this.userService.getinscriptionresponce().subscribe((res => {

      }))
    }

  }
  supprimercopierpermier() {
    this.imagePreviewcopierpermis = null;
    this.formpersonnel.patchValue({ CopierPermis: '' });
  }
  copierpermisimage(e) {
    const file = (e.target as HTMLInputElement).files[0];
    this.formpersonnel.patchValue({ CopierPermis: file });
    this.formpersonnel.get('CopierPermis').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreviewcopierpermis = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
  supprimerimgepersonnel() {
    this.imagePreviewpersonnel = null;
    this.formpersonnel.patchValue({ Image: '' });
  }
  imagepersonnel(e) {
    const file = (e.target as HTMLInputElement).files[0];
    this.formpersonnel.patchValue({ Image: file });
    this.formpersonnel.get('Image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreviewpersonnel = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
  supprimerimageclient() {
    this.imagePreviewclient = null;
    this.formclient.patchValue({ Image: '' });
  }
  imageclient(e) {
    const file = (e.target as HTMLInputElement).files[0];
    this.formclient.patchValue({ Image: file });
    this.formclient.get('Image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreviewclient = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  imagesociete(e) {
    this.imagechangeetat = true;

    const file = (e.target as HTMLInputElement).files[0];
    this.formsociete.patchValue({ Image: file });
    this.formsociete.get('Image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreviewsociete = reader.result as string;
    };
    reader.readAsDataURL(file);

  }
  supprimerlogsociete() {
    this.imagechangeetat = false;
    this.imagePreviewsociete = null;
    this.formsociete.patchValue({ Image: null });
  }

  changerole(role, status) {
    console.log(role)
    const indexrole = this.userRole.findIndex(r => r.ID === role.ID);
    if (status === true) {
      if (indexrole !== -1) {
        this.userRole[indexrole].Etat = true;


      } else {
        const r: Role = {
          ID: role.ID,
          Libelle: role.Libelle,
          Etat: true,
          BI: 'i'
        }
        this.userRole.push(r)
      }
    } else {
      if (indexrole !== -1) {
        if (this.userRole[indexrole].BI === 'i') {
          this.userRole = this.userRole.filter(r => r.ID !== role.ID)

        } else {
          this.userRole[indexrole].Etat = false;
        }
      }


    }

  }
  rolecheck(role) {


    if (this.user?.roles) {
      return this.user.roles.findIndex((r: Role) => r.ID === role.ID) !== -1;

    }
    return false;
  }

  calculPrix(v) {
    this.formsociete.get('Montant').setValue('');

    const free = (Number(v.source.value) * this.fraisMonsuelAbonnement);
    this.formsociete.get('Montant').setValue(free.toFixed(3));
  }

  changeform(formname, userfuction) {
    this.Userfunction = userfuction;
    console.log(this.roles)
    console.log(userfuction)


    const roledebut = this.roles.find(r => r.Libelle === userfuction)

    roledebut.Etat = true;
    roledebut.BI = 'i'
    this.userRole = []
    this.userRole.push(roledebut)
    console.log(this.userRole)
    eval('this.' + formname + '()');
  }



  registerpersonnel() {

    if (this.formpersonnel.invalid) {
      return;
    }

    if (this.userID !== null) {
      if (this.userRole.length !== 0) {

        this.roleservices.adduserrole(this.userRole, this.userID);
      }
      var image = null;

      if (this.imagechangeetat) {
        image = this.formsociete.value.Image;

      }
      this.userService.updatepersonnel(
        this.formpersonnel.value.Cin,
        this.formpersonnel.value.Nom,
        this.formpersonnel.value.Prenom,
        this.formpersonnel.value.DateDeNaissance,

        this.formpersonnel.value.Adresse,
        this.formpersonnel.value.Tel,
        this.formpersonnel.value.Fax,
        this.formpersonnel.value.Email,
        this.formpersonnel.value.NumCNSS,
        this.user.CopierPermis,

        this.formpersonnel.value.SituationFamilialle,
        this.formpersonnel.value.Login,
        this.user.Image,
        this.user.MotDePasse,
        this.user.SocieteID,
        this.user.Function,
        this.userID // id pour edit
      );
    } else {
      this.userService.inscriptionpersonnel(
        Number(this.formpersonnel.value.Cin),
        this.formpersonnel.value.Nom,
        this.formpersonnel.value.Prenom,
        this.formpersonnel.value.DateDeNaissance,
        this.formpersonnel.value.Adresse,
        Number(this.formpersonnel.value.Tel),
        Number(this.formpersonnel.value.Fax),
        this.formpersonnel.value.Email,
        Number(this.formpersonnel.value.NumCNSS),
        this.formpersonnel.value.CopierPermis,
        this.formpersonnel.value.SituationFamilialle,
        this.formpersonnel.value.Login,
        this.formpersonnel.value.MotDePasse,
        this.formpersonnel.value.Image,
        this.formpersonnel.value.SocieteID,

        this.userRole,
        this.userstatus
      );
    }

    let typealert;
    /* this.userService.getinscriptionresponce().subscribe((res => {
         if (res.ok === true) {
             typealert = 'success';
         } else {
             typealert = 'danger';
         }
         this.alerts[1] = ({
             type: typealert,
             message: res.msg
         });
     }));*/
  }

  initFormSociete() {
    this.title = 'Ajout société';

    this.formsociete = new FormGroup({
      Rs: new FormControl('', {
        validators: [Validators.required]
      }),
      Adresse: new FormControl('', {
        validators: [Validators.required]
      }),
      Tel: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(this.CinPattern),
      ]),
      Fax: new FormControl(null, [
        Validators.minLength(8),
        Validators.pattern(this.CinPattern),
      ]),
      Email: new FormControl('', {
        validators: [Validators.required, Validators.pattern(this.EmailPattern)]
      }),
      Site: new FormControl('', {
        validators: [Validators.pattern(this.urlpatter)]
      }),
      Matfiscale: new FormControl('', {
        validators: [Validators.required]
      }),
      Image: new FormControl('', {
        validators: []
      }),

      MotDePasse: new FormControl('', {
        validators: [Validators.required, Validators.minLength(6)]
      }),
      Login: new FormControl('', {
        validators: [Validators.required, Validators.minLength(2)]
      }),
      Status: new FormControl('', {
        validators: []
      }),
      DateDebut: new FormControl(this.datePipe.transform(new Date(), 'yyyy-MM-dd')),
      // DateFin: new FormControl('', [Validators.required]),
      Montant: new FormControl({ value: '', disabled: true }, []),
      Period: new FormControl('', [])


    });
  }
  initFormclient() {
    this.title = 'Ajout client';

    this.formclient = new FormGroup({
      Rs: new FormControl('', {
        validators: [Validators.required]
      }),
      Adresse: new FormControl('', {
        validators: [Validators.required]
      }),
      Tel: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(this.CinPattern),
      ]),
      Fax: new FormControl(null, [
        Validators.minLength(8),
        Validators.pattern(this.CinPattern),
      ]),
      Email: new FormControl('', {
        validators: [Validators.required, Validators.email]
      }),
      Site: new FormControl('', {
        validators: []
      }),
      NomPC: new FormControl('', {
        validators: []
      }),
      PrenomPC: new FormControl('', {
        validators: []
      }),
      TelPersonnelContact: new FormControl(null, {
        validators: [
          Validators.minLength(8),
          Validators.pattern(this.CinPattern),]
      }),
      FaxPersonnelContact: new FormControl(null, {
        validators: [
          Validators.minLength(8),
          Validators.pattern(this.CinPattern),]
      }),
      AdresseEmailPersonnel: new FormControl('', {
        validators: [Validators.email]
      }),
      Matfiscale: new FormControl('', {
        validators: [Validators.required]
      }),
      Regfiscale: new FormControl('', {
        validators: []
      }),
      Login: new FormControl('', {
        validators: [Validators.required],
      }),
      MotDePasse: new FormControl('', {
        validators: [Validators.required],
      }), Image: new FormControl('', {
        validators: []
      }),
      SocieteID: new FormControl('', {
        validators: [Validators.required],
      }),

    });
  }
  initFormPersonnel() {
    this.title = 'Ajout personnel';

    this.formpersonnel = new FormGroup({
      Cin: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(this.CinPattern),
      ]),
      Nom: new FormControl(null, [Validators.required]),
      Prenom: new FormControl(null, {
        validators: [Validators.required],
      }),
      DateDeNaissance: new FormControl(null, {
        validators: [Validators.required],
      }),
      Adresse: new FormControl(null, {
        validators: [Validators.required],
      }),
      Tel: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(this.CinPattern),
      ]),
      Fax: new FormControl(null, [
        Validators.pattern(this.CinPattern),
      ]),
      Email: new FormControl(null, [
        Validators.required,
        Validators.email,
      ]),
      NumCNSS: new FormControl(null, {
        validators: [Validators.pattern('[0-9]')],
      }),
      CopierPermis: new FormControl(null, {
        validators: [],
      }),
      SituationFamilialle: new FormControl(null, {
        validators: [Validators.required],
      }),
      Login: new FormControl(null, {
        validators: [Validators.required],
      }),
      MotDePasse: new FormControl(null, {
        validators: [Validators.required],
      }),
      Image: new FormControl(null, {
        validators: []
      }),
      SocieteID: new FormControl(null, {
        validators: [Validators.required],
      }),

    });
  }
  openimage(imagepath) {
    const dialogRef = this.dialog.open(ImagezoomComponent, {
      width: '80%',
      height: '80%',
      data: { imagePath: imagepath }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });

  }





}
