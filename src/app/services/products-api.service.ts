import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from '../pages/apps/aio-table/interfaces/products.models';

@Injectable({providedIn: 'root'})

export class ProductsApiService {
    private url = "http://localhost:3000/produtos";

    constructor(private httpClient: HttpClient) {}

    getAllProducts(): Observable<Produto[]>{
        return this.httpClient.get<Produto[]>(this.url)
    }
    
}