import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Funcionarios } from 'src/app/models/funcionarios.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';

/**
 * @title Table with pagination
 */
@Component({
  selector: 'datatable',
  styleUrls: ['datatable.component.css'],
  templateUrl: 'datatable.component.html',
})
export class DataTable implements AfterViewInit {
  
  @Input()
  FUNCIONARIOS_DATA: Funcionarios[] ;

 dataSource;
  
  
  displayedColumns: string[] = ['nome_funcionario', 'cpf_funcionario', 'orgao', 'setor', 'funcao', 'acao'];
  paginatorBck: any;
  dataSourceBackup: Funcionarios[];
  
  
  
  constructor(  private snackBar: MatSnackBar, 
                private http: HttpClient,
                private router: Router
    ){
      this.http.get<any>(`${environment.apiUrl}Funcionarios`, {headers: {Authorization: `Bearer ${environment.authorization}`}})
      .subscribe(
        (data)=> {
          this.dataSource = new MatTableDataSource<Funcionarios>(data.info);
          this.dataSource.paginator = this.paginator;
        },
        (erro)=>{
        }
      );
    }
    
    
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild('retorno') retorno: ElementRef;

    ngAfterViewInit() {
     
  }
editar(i){
  environment.funcionario = i;
  this.router.navigate(['/edit']);
    
}

applyFilter(filterValue) {  
  
  
  this.dataSource.filter = filterValue.target.value.trim().toLowerCase(); 
  
}
}

