import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Usuario } from './usuario';

import { UsermodalComponent } from './usermodal/usermodal.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  usuarioAutenticado: boolean = false;

  constructor(
    private router: Router,
    private dialog: MatDialog,    

    ) { }

  fazerLogin(usuario: Usuario) {
    if (usuario.nome === "usuario@email.com" &&
      usuario.senha === '123456') {
        this.usuarioAutenticado = true;  
        this.router.navigate(['/']);    
      
    } else {
      this.usuarioAutenticado = false;
      this.openDialog();
    }  
  }

  usuarioEstaAutenticado(){
    return this.usuarioAutenticado
  }

  openDialog() {
    this.dialog.open(UsermodalComponent).afterClosed().subscribe(()=> {
      console.log('Dialog')
    })  
}

}
