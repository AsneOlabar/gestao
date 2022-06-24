import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators,  FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import {filter} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-redefinir-senha',
  templateUrl: './redefinir-senha.component.html',
  styleUrls: ['./redefinir-senha.component.css']
})
export class UpdateSenhaComponent implements OnInit {
mensagem : any;
  tk: any;
payload: any;
  constructor( 
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private http: HttpClient,
    private route: ActivatedRoute,

  ) { }
hide: boolean = false;
  loginForm = this.formBuilder.group({
    password: ['', [Validators.required]],
    passwordConfirm: ['', [Validators.required]], 
  }); 
  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        if(params['a']){      
          this.tk = params['a']     
          this.payload = JSON.parse(atob(params['a'].split('.')[1]));
        }
        else
        {
          this.router.navigate(['/login']);
        }
      });
  
  }
  updateSenha(){
    this.http.post(`${environment.apiUrl}RedefineSenha`, {userName: this.payload.userName, senha: this.loginForm.value.password, senhaConfirm: this.loginForm.value.passwordConfirm }, {headers: {Authorization: `Bearer ${this.tk}`}})
    .subscribe(resp =>{
      this.mensagem = resp;
      this.snackBar.open(this.mensagem.msg, "X", {duration: 3000})
      this.router.navigate(['/login']);      
    },
    err => {
      this.mensagem = err.error
      this.snackBar.open(this.mensagem.msg, "X", {duration: 3000})

    }
    
    );
  }

}
