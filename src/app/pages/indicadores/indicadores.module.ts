import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndicadoresComponent } from './indicadores.component';
import { IndicadoresRoutingModule } from './indicadores-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AlertmodalComponent } from './alertmodal/alertmodal.component';
import { IconModule } from '@visurel/iconify-angular';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [IndicadoresComponent, AlertmodalComponent],
  imports: [
    CommonModule,
    IndicadoresRoutingModule,
    HttpClientModule,
    IconModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
  ]
})
export class IndicadoresModule {
}
