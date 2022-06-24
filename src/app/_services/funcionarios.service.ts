import { EventEmitter, Injectable, Sanitizer } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { Funcionarios } from 'src/app/models/funcionarios.interface';


@Injectable({ providedIn: 'root' })

export class FuncionariosService { //Realiza o serviço de autenticação junto a api


  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    
  }

 
  getFuncionarios(): any { //Faz a requisição de autenticação e inicia as variáveis necessárias
    
    this.http.get<any>(`${environment.apiUrl}Funcionarios`, {headers: {Authorization: `Bearer ${environment.authorization}`}})
    .subscribe((resp)=> {

    },
    (err)=>{
      console.log(err);
    }
    )
    
    return 
     ;
  }

  
}