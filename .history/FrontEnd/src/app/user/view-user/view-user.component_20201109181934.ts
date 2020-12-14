import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Role } from 'src/app/models/role';
import { User } from 'src/app/models/usermodel';
import { RoleService } from 'src/app/services/role.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {

  user: User;
    roles: Role[] = [];
    constructor(public dialogRef: MatDialogRef<ViewUserComponent>, private roleservices: RoleService,
                @Inject(MAT_DIALOG_DATA) public data: any, private userService: UserService) { }

    ngOnInit(): void {
        this.userService.getOneuser(this.data.ID);
        this.userService.getoneusersubscribe().subscribe((res => {
            this.user = res;

        }));
        this.roleservices.getallRole();
        this.roleservices.getRolesub().subscribe((res => {
            this.roles = res; }));

    }
    onNoClick(): void {
        this.dialogRef.close();
    }

    rolecheck(role) {
        if (this.user.roles) {
            return this.user.roles.findIndex((r: Role) => r.ID === role.ID) !== -1;

        }
        return false;
    }

}
