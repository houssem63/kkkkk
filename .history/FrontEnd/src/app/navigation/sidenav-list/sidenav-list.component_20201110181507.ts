import { LoginService } from './../../services/login.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  @Output() closeSidenav = new EventEmitter<void>();
  @Output() ReduireSaideNav = new EventEmitter<void>();
  constructor(public loginservice: LoginService) { }
flechdirection='keyboard_backspace';
  ngOnInit() {
  }

  onClose() {
    console.log('click1');
    this.closeSidenav.emit();
  }
  onreduire() {
    this.flechdirection ='arrow_right_alt'
    console.log('click');
    this.ReduireSaideNav.emit();
  }
}
