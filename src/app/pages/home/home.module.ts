import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTable } from './datatable/datatable.component';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { FuncionariosService } from '../../_services/funcionarios.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { AuthGuard } from 'src/app/_services/authguard';
import { CadastroComponent } from './cadastro/cadastro.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { EditComponent } from './edit/edit.component';


@NgModule({
  declarations: [HomeComponent, DataTable, CadastroComponent, EditComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    
    AngularMaterialModule,
    HttpClientModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule
  ],
  providers: [
    AuthenticationService, AuthGuard,
    FuncionariosService
  ]
  
})
export class HomeModule { }
