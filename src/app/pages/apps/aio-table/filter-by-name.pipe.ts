import { Pipe, PipeTransform } from "@angular/core";
import { Produto } from "./interfaces/products.models";

@Pipe({ name: 'filterByName'})
export class filterByName implements PipeTransform {
  transform(products: Produto[], nameQuery: string){
    nameQuery = nameQuery.trim().toLowerCase();

    if(nameQuery) {
      return products.filter(product =>
        product.nome.toLowerCase().includes(nameQuery)
      );
      }else {
        return products;
      }
    }

  }