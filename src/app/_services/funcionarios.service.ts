import { EventEmitter, Injectable, Sanitizer } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { Funcionarios } from 'src/app/models/funcionarios.interface';
import { AuthenticationService } from './authentication.service';

@Injectable({ providedIn: 'root' })

export class FuncionariosService { //Realiza o serviço de autenticação junto a api


  constructor(
    private http: HttpClient,
    private router: Router,
    private auth: AuthenticationService
  ) {}

 

  

  
}