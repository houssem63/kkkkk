import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  @Output() closeSidenav = new EventEmitter<void>();
  @Output() ReduireSaideNav = new EventEmitter<void>();
  constructor() { }

  ngOnInit() {
  }

  onClose() {
    console.log('click1')
    this.closeSidenav.emit();
  }
  onreduire(){
    console.log('click')
// his.ReduireSaideNav.emit();
  }
}
