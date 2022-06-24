import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators,  FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from '../../_services/authentication.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  submitted = false;
  
  
  loginForm = this.formBuilder.group({
    usuario: ['', [Validators.required]],
    password: ['', [Validators.required]], 
  });  
   
  
  
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private auth: AuthenticationService
  ) { }



  ngOnInit(): void {
   
  }

  
  login() { //Envia o formulário de login para a API
    this.auth.login(this.loginForm.value.usuario, this.loginForm.value.password)
    .subscribe(
      data => {
          
          let split = data.Authorization
          
          let payload = JSON.parse(atob(split.split('.')[1]));
        environment.user = payload
        environment.authorization =  data.Authorization;
        this.router.navigate(['/']);

      }, error =>{
        
        this.snackBar.open(error.error.msg, 'X', {
          duration: 3000
        })
      }
    )
    

   
  }
 

}
