import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-imagezoom',
  templateUrl: './imagezoom.component.html',
  styleUrls: ['./imagezoom.component.css']
})
export class ImagezoomComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ImagezoomComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}
ngOnInit(){
  console.log(this.data)
}
  onNoClick(): void {
    this.dialogRef.close();
  }
  @HostListener('mouseout', ['$event'])
  handleMousemove(event) {
    console.log(event);
    this.dialogRef.close()
  }
}
