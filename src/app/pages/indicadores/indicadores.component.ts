import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CharactersApiService } from 'src/app/services/characters-api.service';

@Component({
  selector: 'vex-indicadores',
  templateUrl: './indicadores.component.html',
  styleUrls: ['./indicadores.component.scss']
})
export class IndicadoresComponent  {
 
  constructor(private characterService: CharactersApiService) { }
  allCharacters: Observable<any>;

  ngOnInit() {
    this.getCharacters();
  }

  getCharacters() {
    this.allCharacters = this.characterService.getAllCharacters();
  }


}
