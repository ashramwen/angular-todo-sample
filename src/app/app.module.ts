import { AuthGuardService } from './services/auth-guard/auth-guard.service';
import { KiiService } from './services/kii/kii.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import 'hammerjs';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { TodoDetailComponent } from './components/todo-detail/todo-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TodoDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MaterialModule.forRoot()
  ],
  providers: [AuthGuardService, KiiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
