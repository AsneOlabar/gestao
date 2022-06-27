import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { AuthGuard } from '../../_services/authguard';
import { DataTable } from './datatable/datatable.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  {path: "" , component: HomeComponent, 
  children: [  
    { path: 'ativos', component: DataTable }, 
    { path: '',redirectTo: "ativos" , pathMatch: "full" }, 

    { path: 'cadastro', component: CadastroComponent },
    { path: 'edit', component: EditComponent },
  
  ]}


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
