import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import md5 from 'md5';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})

export class CharactersApiService {
    PUBLIC_KEY = '9b41487057fcfdbf4c74c1970b896b5b';
    PRIVATE_KEY = '96dffe82e5ae833dae7443dc1a17ed036d25c2c0';
    TIME = Number(new Date());

    HASH = md5(this.TIME + this.PRIVATE_KEY + this.PUBLIC_KEY);

    URL_API = `http://gateway.marvel.com/v1/public/characters?ts=${this.TIME}&apikey=${this.PUBLIC_KEY}&hash=${this.HASH}`;

    constructor(private http: HttpClient) {}

    getAllCharacters(): Observable<any>{
        return this.http.get<any>(this.URL_API)
        .pipe(map((data: any) => data.data.results))
    }
}