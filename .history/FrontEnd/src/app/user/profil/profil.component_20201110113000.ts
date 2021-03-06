import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/models/usermodel';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  constructor(private userservice: UserService,public dialog: MatDialog) { }
  IDuser;
  panelOpenState = false;
  imageprofile;
  user: User;
  imageprofilecontrole;
    ngOnInit(): void {
        this.IDuser = JSON.parse(localStorage.getItem('user')).ID;

        this.userservice.getOneuser(this.IDuser)
        this.userservice.getoneusersubscribe().subscribe((res) => {
  this.user = res;
  this.imageprofile = res.Image;
        });
    }
    openDialog(id): void {
     /* const dialogRef = this.dialog.open(EditProfileComponent, {
        width: '250px',
        data: {ID: id}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });*/
    }
    changeimage(e){
      const file = (e.target as HTMLInputElement).files[0];
      this.imageprofilecontrole=file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imageprofile = reader.result as string;
      };
      reader.readAsDataURL(file);
      console.log( this.imageprofilecontrole)

      this.userservice.changeimage(this.imageprofilecontrole,this.IDuser).subscribe((res) => {
        console.log(res)
        this.user.Image = res.imagepath;

      });
    }

}
