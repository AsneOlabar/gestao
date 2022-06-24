import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { FuncionariosService } from 'src/app/_services/funcionarios.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

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
    private funcionarios: FuncionariosService,

    ) {}


  ngOnInit(): void {
    this.user = environment.user;
    this.funcionarios.getFuncionarios()
    .subscribe(info => {
      this.dataSource = info.info
    }, 
      
      );
    this.route = this.router.url;
    console.log(this.route)
  }


logout(){
  environment.logado = false;
  this.router.navigate(['/login']);}
  
}
