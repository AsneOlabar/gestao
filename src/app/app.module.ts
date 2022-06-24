import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AuthenticationService } from './_services/authentication.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AngularMaterialModule} from './angular-material.module';
import { LoginComponent } from './pages/login/login.component';
import { DataTable } from './pages/datatable/datatable.component';
import { ResetComponent } from './pages/reset/reset.component';
import { HomeComponent } from './pages/home/home.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { AuthGuard } from './_services/authguard';
import { UpdateSenhaComponent } from './pages/redefinir-senha/redefinir-senha.component';
import { FuncionariosService } from './_services/funcionarios.service';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ResetComponent,
    HomeComponent,
    UpdateSenhaComponent,
    DataTable
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HttpClientModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule
  ],
  providers: [AuthenticationService, AuthGuard, FuncionariosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
