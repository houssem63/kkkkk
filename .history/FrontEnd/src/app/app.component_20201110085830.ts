import { Component, ViewChild, OnInit } from '@angular/core';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('sidenav') cole;
  title = 'GST';
  width = 250;

  constructor(public loginService: LoginService) {

  }
  ngOnInit(): void {
    this.loginService.autoAuthUser();
  }
  require() {

    if (this.width === 0) {
      this.width = 250;
    } else {
      if (this.width === 250) {

        this.width = 50;
      } else {
        this.width = 250;
      }

    }

  }
}
