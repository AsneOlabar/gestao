import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit{

  foto;
  
  cadastro = this.fb.group({
    nome_funcionario:  [environment.funcionario.nome_funcionario, Validators.required],
    cpf_funcionario: [environment.funcionario.cpf_funcionario, Validators.required],
    funcional: [environment.funcionario.funcional, Validators.required],
    identidade:[environment.funcionario.identidade, Validators.required],
    emissor: [environment.funcionario.emissor, Validators.required],
    sangue: [environment.funcionario.sangue, Validators.required],
    setor: [environment.funcionario.setor, Validators.required],
    funcao: [environment.funcionario.funcao, Validators.required],
    ramal: [environment.funcionario.ramal, Validators.required],
    reimpressao: [false,],

  });


  isImageSaved: boolean = false;

  imgBase64Path;
  cardImageBase64: string = "";
  foto64: any;
  tipoSanguineo = ['A +','A -', 'AB +', 'AB -', 'B +', 'B -', 'O +', 'O -', 'Não Informado' ]
  constructor(private fb: FormBuilder,
              private snackBar: MatSnackBar,
              private http: HttpClient,
              private router: Router

    ) {}

  onSubmit(): void {
    environment.funcionario.nome_funcionario = this.cadastro.value.nome_funcionario;
    environment.funcionario.cpf_funcionario = this.cadastro.value.cpf_funcionario;
    environment.funcionario.funcional = this.cadastro.value.funcional;
    environment.funcionario.identidade = this.cadastro.value.identidade;
    environment.funcionario.emissor = this.cadastro.value.emissor;
    environment.funcionario.sangue = this.cadastro.value.sangue;
    environment.funcionario.setor = this.cadastro.value.setor;
    environment.funcionario.funcao = this.cadastro.value.funcao;
    environment.funcionario.ramal = this.cadastro.value.ramal;
    environment.funcionario.reimpressao = this.cadastro.value.reimpressao;
    environment.funcionario.solicitante = environment.user[0].funcional;
    
    environment.funcionario.orgao_requisitante = environment.user[0].perfil_rh;
    


    this.http.put(`${environment.apiUrl}Funcionario`, environment.funcionario, {headers: {Authorization: `Bearer ${environment.authorization}`}})
    .subscribe((resp)=>{
      this.snackBar.open(resp['msg'],"X", {duration: 3000} )  
      environment.funcionario = null;  
      this.router.navigate(['..']);
    }, (err)=>{

  this.snackBar.open(err['msg'],"X", {duration: 3000} )   

  this.router.navigate(['..']);

    }

    )
    
  }

  public compareWith(object1: any, object2: any) {
    return object1 == object2;
  }

  ngOnInit(): void {

    if(environment.funcionario.foto64){
      
      this.foto = environment.funcionario.foto64;
    }
    else{
      this.foto = 'https://identificacao.subsecmilitar.rj.gov.br/fotos/' + environment.funcionario.foto_funcionario; 
    }
    
  
  }
  CreateBase64String(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        environment.funcionario.foto64 = e.target.result;

        image.onload = rs => {
          this.imgBase64Path = e.target.result;
          this.cardImageBase64 = this.imgBase64Path;         
          this.isImageSaved = true;
        };
      };
      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }
  }

