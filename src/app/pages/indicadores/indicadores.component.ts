import { Component } from '@angular/core';
import { empty, Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ProductsApiService } from 'src/app/services/products-api.service';
import { Produto } from '../apps/aio-table/interfaces/products.models';

@Component({
  selector: 'vex-indicadores',
  templateUrl: './indicadores.component.html',
  styleUrls: ['./indicadores.component.scss']
})
export class IndicadoresComponent  {
 
  constructor(private productsService: ProductsApiService) { }

  allProducts$: Observable<Produto[]>
  error$ = new Subject<boolean>();

  ngOnInit() {
     this.allProducts$ = this.productsService.getAllProducts()
     .pipe(
       catchError(error => {
         console.error(error);
         this.error$.next(true);
         return empty();
       })
     )
  } 

}
