import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })

export class AuthGuard implements CanActivate {

    /* Guarda de rota para que somente seja exibido conteúdo para pessoas logadas*/

   
    constructor(
        private router: Router
        ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
                
        if (environment.logado){  
                return true;  
            
        }       
           /* Com memorização da rota requisitada Se não estiver logado será redirecionado para a 
           página de login e após login direcionado pára a rota inicial*/

            this.router.navigate(['/login']);
            return false;

    }    

}