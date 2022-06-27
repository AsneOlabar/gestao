import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {
  cadastro = this.fb.group({
    nome_funcionario:  [null, Validators.required],
    foto_funcionario: [null,],
    foto_input: [null, Validators.required],
     cpf_funcionario: [null, Validators.required],
    funcional: [null, Validators.required],
    identidade:[null, Validators.required],
    emissor: [null, Validators.required],
    sague: [null, Validators.required],
    orgao: [null, Validators.required],
    setor: [null, Validators.required],
    funcao: [null, Validators.required],
    ramal: [null, Validators.required],
    data_do: [null, Validators.required],
    num_do: [null, Validators.required],
    pag_do: [null, Validators.required],
    
  });

  isImageSaved: boolean = false;

  imgBase64Path;
  cardImageBase64: string = "";

  constructor(private fb: FormBuilder) {}

  onSubmit(): void {
console.log(this.cadastro.value);
  }

  CreateBase64String(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        this.cadastro.value.foto_funcionario64 = e.target.result;
        this.cadastro.value.foto_funcionario = null;


        image.onload = rs => {
          this.imgBase64Path = e.target.result;
          this.cardImageBase64 = this.imgBase64Path;         
          this.isImageSaved = true;
          console.log(this.cadastro.value.foto_funcionario);
        };
      };
      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  
}
