import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AltSenhaComponent } from './altSenha/altSenha.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  pass;
  atual;
  nova;
  confirmacao;
  user;
  mensagem;
  dataSource: any;
  route;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,     private router: Router,
    private http: HttpClient,
    private auth: AuthenticationService,
    public dialog: MatDialog
    

    ) {}

 
  ngOnInit(): void {
    this.user = environment.user;
    

  }

  url(){
    return this.router.url
  }


logout(){
  this.auth.logout()
}

openDialog(): void {
  const dialogRef = this.dialog.open(AltSenhaComponent, {
    width: 'auto',
    height: 'auto',
    data: {atual: this.atual, nova: this.nova, confirmacao: this.confirmacao},
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    this.pass = result;
  });
}


}
