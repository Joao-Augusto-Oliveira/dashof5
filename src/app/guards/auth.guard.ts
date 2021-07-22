import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../pages/pages/auth/login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) : Observable<boolean> | boolean {

    return this.verificarAcesso();

  }
    private verificarAcesso(){

      if(this.authService.usuarioEstaAutenticado()){
        return true;
      }
      this.router.navigate(['/login']);
          return false;      
    }

    canLoad(route: Route): Observable<boolean>|Promise<boolean>|boolean {     
      console.log('Verificando se o usuário tem acesso ao código')
      return this.verificarAcesso();

    }
}
