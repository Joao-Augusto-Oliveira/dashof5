import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AlertGuard implements CanActivateChild {
  
  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) : Observable<boolean> | boolean {

    if(state.url.includes('indicadores')){
      alert('Usuário sem acesso!')
      return false;
    }

      return true;
  
  }
}
