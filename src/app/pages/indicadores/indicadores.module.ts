import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndicadoresComponent } from './indicadores.component';
import { IndicadoresRoutingModule } from './indicadores-routing.module';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [IndicadoresComponent],
  imports: [
    CommonModule,
    IndicadoresRoutingModule,
    HttpClientModule
  ]
})
export class IndicadoresModule {
}
