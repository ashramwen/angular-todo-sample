import { AppConfig } from './../../app.config';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  user: KiiUser;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {

  }

  login() {
    KiiUser.authenticate(this.username, this.password).then((theUser: KiiUser) => {
      localStorage.setItem(AppConfig.STORAGE_TOKEN_KEY, theUser.getAccessToken());
      this.router.navigate(['todo']);
    }).catch(error => {
      var theUser = error.target;
      var errorString = error.message;
      console.log('fail:' + errorString);
    });
  }

}
