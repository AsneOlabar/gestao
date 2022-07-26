import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {
  isImageSaved: boolean = false;
  tipoSanguineo = ['A +','A -', 'AB +', 'AB -', 'B +', 'B -', 'O +', 'O -', 'Não Informado' ]
 foto64 ="";
  imgBase64Path;
  cardImageBase64: string = "";
  show = false;
  
    cadastro          = this.fb.group({
    nome_funcionario  :  ['', Validators.required],
    foto_funcionario  : ['', Validators.required],
    foto_input        : ['',],
    foto64            : ['',],
    cpf_funcionario   : ['', Validators.required],
    funcional         : ['', Validators.required],
    identidade        : ['', Validators.required],
    emissor           : ['', Validators.required],
    sangue            : ['', Validators.required],   
    setor             : ['', Validators.required],
    funcao            : ['', Validators.required],
    ramal             : ['', Validators.required],
    data_do           : ['', Validators.required],
    num_do            : ['', Validators.required],
    pag_do            : ['', Validators.required],
    
  });
  
  constructor(private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private http: HttpClient,
    private router: Router

    ) {}

  onSubmit(): void {

    
    environment.funcionario = this.cadastro.value;
    
    environment.funcionario.solicitante = environment.user[0].funcional;
    environment.funcionario.orgao = environment.user[0].perfil_rh;
    environment.funcionario.foto_funcionario = "";
    
    environment.funcionario.foto64 = this.foto64;
    
  this.http.post(`${environment.apiUrl}Cadastro`, 
  
  environment.funcionario

  ,
  {headers:{Authorization: `Bearer ${environment.authorization}`}})
  .subscribe((resp)=>{                 
         

    this.snackBar.open(resp['msg'],"X", {duration: 3000} )    
    this.router.navigate(['..']);
  }, (err)=>{

this.snackBar.open(err['msg'],"X", {duration: 3000} )    
this.router.navigate(['..']);

  }
  )
  


  }

  CreateBase64String(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        this.foto64 = e.target.result;
        this.cadastro.value.foto64 = e.target.result

        image.onload = rs => {
          this.imgBase64Path = e.target.result;
          this.cadastro.value.foto_funcionario = 
          this.cardImageBase64 = this.imgBase64Path;         
          this.isImageSaved = true;
        };
      };
      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  applyFilter(filterValue) {  
  
  
    let busca = environment.funcionarios.filter((funcionarios)=> funcionarios.cpf_funcionario == filterValue.target.value.trim().toLowerCase() ); 

    if (busca.length >= 1 ){
  environment.funcionario = busca[0];
  this.router.navigate(['/edit']);
}
else{
  this.http.get(`${environment.apiUrl}Funcionario/${filterValue.target.value.trim().toLowerCase()}`,  
  {
   headers: {"Authorization": `Bearer ${environment.authorization}`}
 }

 ) 
 .subscribe(
   (data)=>{
     if(data['code'] == 0.1){
      this.snackBar.open('Cadastre o funcionário',"X", {duration: 3000} )    
      this.show = true;

     }
     else if(data['code'] == 1){
      environment.funcionario = data['info'];
      
      this.router.navigate(['/edit']);     }
   },
   err=> {
    this.snackBar.open(err['msg'],"X", {duration: 3000} )    

   }
 );
}
  }


}
