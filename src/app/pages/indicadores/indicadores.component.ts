import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsApiService } from 'src/app/services/products-api.service';
import { Produto } from '../apps/aio-table/interfaces/products.models';

@Component({
  selector: 'vex-indicadores',
  templateUrl: './indicadores.component.html',
  styleUrls: ['./indicadores.component.scss']
})
export class IndicadoresComponent  {
 
  constructor(private productsService: ProductsApiService) { }
  
  allProducts: Observable<Produto[]>;

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.allProducts = this.productsService.getAllProducts();
  }

}
