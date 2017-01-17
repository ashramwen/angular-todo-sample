import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: KiiUser;

  constructor() { }

  ngOnInit() {
    Kii.initializeWithSite('d6fb3474', '16ed23f5d46ec414d824907053a145d5', KiiSite.JP);

    var username = 'aaaa';
    var password = 'bbbb';

    KiiUser.authenticate(username, password).then((theUser: KiiUser) => {
      console.log(theUser);
      this.user = theUser;
    }).catch(error => {
      var theUser = error.target;
      var errorString = error.message;
      console.log('fail:' + errorString);
    });
  }

}
