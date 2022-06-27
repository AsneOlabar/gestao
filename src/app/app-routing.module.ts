import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ResetComponent } from './pages/reset/reset.component';
import { AuthGuard } from './_services/authguard';
import { UpdateSenhaComponent } from './pages/redefinir-senha/redefinir-senha.component';

const routes: Routes = [
  {path: "login" , component: LoginComponent },
  {
    path: '',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),
    canActivate: [AuthGuard]
  },
  {path: "reset" , component: ResetComponent},
  {path: "tk" , component: UpdateSenhaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
