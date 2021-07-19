import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndicadoresComponent } from './indicadores.component';
import { IndicadoresRoutingModule } from './indicadores-routing.module';


@NgModule({
  declarations: [IndicadoresComponent],
  imports: [
    CommonModule,
    IndicadoresRoutingModule,
  ]
})
export class IndicadoresModule {
}
