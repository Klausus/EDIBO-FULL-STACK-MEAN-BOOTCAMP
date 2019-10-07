import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { PrincipalComponent } from './principal/principal.component';
import { AboutComponent } from './about/about.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TodoComponent } from './todo/todo.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  { path: '' , component: PrincipalComponent , canActivate:[AuthGuard] },
  { path: 'home' , component: PrincipalComponent , canActivate:[AuthGuard] },
  { path: 'about' , component: AboutComponent , canActivate:[AuthGuard] },
  { path: 'todo' , component: TodoComponent , canActivate:[AuthGuard] },
  { path: 'login' , component: LoginComponent },
  { path: '**' , component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
