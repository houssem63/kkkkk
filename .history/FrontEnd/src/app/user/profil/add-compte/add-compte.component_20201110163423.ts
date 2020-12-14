import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-compte',
  templateUrl: './add-compte.component.html',
  styleUrls: ['./add-compte.component.css']
})
export class AddCompteComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddCompteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}
ngOnInit(){}
  onNoClick(): void {
    this.dialogRef.close();
  }

}
