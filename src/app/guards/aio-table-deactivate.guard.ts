import { AlertGuard } from './alert.guard';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from "@angular/router";
import { AioTableComponent } from '../pages/apps/aio-table/aio-table.component';

@Injectable()
export class AioTableDeactivateGuard implements CanDeactivate<AioTableComponent> {
        
        canDeactivate(
            component: AioTableComponent,
            route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot
        ): Observable<boolean>|Promise<boolean>|boolean {
                        
            return component.podeMudarRota ? component.podeMudarRota() : true;
    }
}
