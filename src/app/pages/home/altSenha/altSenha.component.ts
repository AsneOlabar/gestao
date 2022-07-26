import { HttpClient } from '@angular/common/http';
import {Component, Inject} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { environment } from 'src/environments/environment';

export interface DialogData {
 pass: {atual: string , nova: string,  confirmacao: string}
 }

@Component({
    selector: 'altSenha',
    templateUrl: 'altSenha.component.html',
    styleUrls: ['./altSenha.component.css']
  })
  export class AltSenhaComponent {
    constructor(
      public dialogRef: MatDialogRef<AltSenhaComponent>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData,
      private formBuilder: FormBuilder,
      private snackBar: MatSnackBar,
      private http: HttpClient,
      private auth: AuthenticationService
    ) {
      
    }

    pass:{
      atual: string,
      nova: string,
      confirmacao: string

}
  hide0: boolean = true;
  hide1: boolean = true;
  hide2: boolean = true;
  loginForm = this.formBuilder.group({
    
    atual: ['', [Validators.required]],
    nova: ['', [Validators.required]],
    confirmacao: ['', [Validators.required]], 
  }); 
  
    onNoClick(): void {
      this.dialogRef.close();
    }
    updateSenha(){
     
      
      if(this.loginForm.value.confirmacao == this.loginForm.value.nova){

    
      
      this.http.post(`${environment.apiUrl}UpdateSenha`,  
       {
        "userName": environment.user[0].funcional,
        "senhaAtual":  this.loginForm.value.atual,
        "senha":  this.loginForm.value.nova,
        "confirmacao":  this.loginForm.value.confirmacao
      },
      {
        headers: {"Authorization": `Bearer ${environment.authorization}`}
      }

      )
      .subscribe(
        (resp)=>{
        this.snackBar.open(resp['msg'], 'X', { duration: 3000})
        
        if(resp['code']== 1){
          this.auth.logout();
        }
      },
      (erro)=> {
        this.snackBar.open(erro['msg'], 'X', { duration: 3000})
      }
      
    );
  }
  }
}