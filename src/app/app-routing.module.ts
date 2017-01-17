import { AuthGuardService } from './services/auth-guard/auth-guard.service';
import { TodoDetailComponent } from './components/todo-detail/todo-detail.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'todo',
    component: TodoDetailComponent,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
