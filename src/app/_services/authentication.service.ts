import { EventEmitter, Injectable, Sanitizer } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';


@Injectable({ providedIn: 'root' })

export class AuthenticationService { //Realiza o serviço de autenticação junto a api


  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    
  }

 
  login(usuario: string, password: string) { //Faz a requisição de autenticação e inicia as variáveis necessárias

    let formData: any = new FormData();

    formData.append('userName', usuario);
    formData.append('senha', password);
  

    return this.http.post<any>(`${environment.apiUrl}Login`, formData)
      .pipe(map(user => {
       
        if (user.code === 1) { 
                    
          environment.logado = true;
            this.router.navigate(['/'])
          return user;     
        }    
      }));
  }

 logout() { // Desloga o usuário e destrói a sesão atual da memória do navegador

    this.router.navigate(['/login'])
  }

}