import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-compte-list',
  templateUrl: './compte-list.component.html',
  styleUrls: ['./compte-list.component.css']
})
export class CompteListComponent implements OnInit {
  @Input() public IDuser: string;
  constructor() { }

  ngOnInit(): void {
  }

}
