import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Funcionarios } from 'src/app/models/funcionarios.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { MatSort } from '@angular/material/sort';


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
  
  
  
  constructor(  private snackBar: MatSnackBar, private http: HttpClient
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
  alert(i);
}
/* busca(target?: any){
  
  if(target instanceof EventTarget) {
    var elemento = target as HTMLInputElement;
    target = elemento.value; 
  
  }
  else{
    target = null
  }
  
    console.log(target);

  if(target == null){

    this.dataSource = new MatTableDataSource<Funcionarios>(this.dataSourceBackup);
    this.retorno.nativeElement.innerText = "";
    this.dataSource.paginator = this.paginatorBck;

    return false;
  }
  else {

    let filtro = target.split(' ');
          
    filtro.forEach(element => {
      
      this.dataSource.filter = element.trim().toLowerCase();
      this.dataSource = new MatTableDataSource<Funcionarios>(this.dataSource.filteredData);
      this.dataSource.paginator = this.paginator;
      this.retorno.nativeElement.innerText = this.dataSource.length 

    });  
  }

  if (this.dataSource.filteredData.length  == 0){
    this.retorno.nativeElement.innerText = "Sem correspondência"
  }
  else{
    this.retorno.nativeElement.innerText = this.dataSource.filteredData.length  
  } 
} */
  
}


