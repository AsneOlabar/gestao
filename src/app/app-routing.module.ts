import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ResetComponent } from './pages/reset/reset.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './_services/authguard';
import { UpdateSenhaComponent } from './pages/redefinir-senha/redefinir-senha.component';

const routes: Routes = [
  {path: "login" , component: LoginComponent },
  {path: "reset" , component: ResetComponent},
  {path: "" , component: HomeComponent,  canActivate: [AuthGuard] },
  {path: "tk" , component: UpdateSenhaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
