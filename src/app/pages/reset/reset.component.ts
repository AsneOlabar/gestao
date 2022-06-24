import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {
mensagem: any;
  hide = true;
  submitted = false;
  
  
  loginForm = this.formBuilder.group({
    usuario: ['', [Validators.required]],
  });  
  
  
  
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) { }



  ngOnInit(): void {
   
  }

reset(){
let data = {"userName": this.loginForm.value.usuario}

this.http.post(`${environment.apiUrl}Reset`, {data} )
.subscribe(resp=>{
  this.snackBar.open("informações enviadas para o e-mail cadastrado", "X", {duration: 3000});
  this.router.navigate(['/'])
},
error =>{
        
  this.snackBar.open(error.error.msg, 'X', {
    duration: 3000
  })

});
}

}
