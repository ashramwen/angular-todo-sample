import { TodoPage } from './../pages/todo/todo';
import { KiiService } from './../providers/kii-service';
import { AuthService } from './../providers/auth-service';
import { LoginPage } from './../pages/login/login';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    TodoPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    TodoPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, AuthService, KiiService]
})
export class AppModule {}
