import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, RouterStateSnapshot } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AlertmodalComponent } from '../pages/indicadores/alertmodal/alertmodal.component';

@Injectable()
export class AlertGuard implements CanActivateChild {

  constructor(
    private dialog: MatDialog,   
    ) { }
  
  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) : Observable<boolean> | boolean {

    if(state.url.includes('indicadores')){
      this.openDialog();
      return false;
    }

      return true;
  
  }
  openDialog() {
    this.dialog.open(AlertmodalComponent).afterClosed().subscribe(()=> {
      console.log('Dialog')
    })  
  }

}