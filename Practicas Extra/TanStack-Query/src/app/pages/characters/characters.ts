import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { CharactersService } from '../../services/characters';
import { CharacterDetail } from '../../components/character-detail/character-detail';

@Component({
  selector: 'app-characters',
  imports: [ CharacterDetail ],
  templateUrl: './characters.html',
  styleUrl: './characters.css'
})
export default class Characters {

   charactersService = inject(CharactersService);
  
  get characters() {
    return this.charactersService.CharactersQuery;
  }

}
