import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from "@angular/router";
import { FormCanDeactivate } from './form-candeactivate';

@Injectable()
export class AioTableDeactivateGuard implements CanDeactivate<FormCanDeactivate> {
        
        canDeactivate(
            component: FormCanDeactivate,
            route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot
        ): Observable<boolean>|Promise<boolean>|boolean {                       
           
            console.log('acesso negado')

            return component.podeDesativar();

        }
}
