import { KiiService } from './../../services/kii/kii.service';
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

  credential: {
    username: string,
    password: string
  };

  constructor(
    private router: Router,
    private kiiService: KiiService
  ) { }

  ngOnInit() {
    this.credential = {
      username: '',
      password: ''
    };
  }

  login() {
    this.kiiService.authenticate(this.credential).subscribe(loggedIn => {
      if (loggedIn)
        this.router.navigate(['todo']);
    })
  }

}
