import { take, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Produto } from '../pages/apps/aio-table/interfaces/products.models';

@Injectable({providedIn: 'root'})

export class ProductsApiService {
    private API = `${environment.API}produtos`;

    constructor(private httpClient: HttpClient) {}

    getAllProducts() {
        return this.httpClient.get<Produto[]>(this.API).pipe(
        map((obj)=> obj)
        )
    }

    createProduct(product){
        return this.httpClient.post<Produto[]>(this.API, product).pipe(
            map((obj)=> obj)
            )
    }

    updateProduct(product){
        return this.httpClient.put<Produto[]>(this.API + "/" + product.id, product)
    }

    removeProduct(product){
        return this.httpClient.delete<Produto[]>(this.API + "/" + product.id)
    }

    
    
}