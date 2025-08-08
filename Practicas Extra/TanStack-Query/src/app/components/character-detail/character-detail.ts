import { Component, inject } from '@angular/core';
import { input } from '@angular/core';
import { Item } from '../../interfaces/ICharacters';
import { CharacterService } from '../../services/character';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-character-detail',
  imports: [RouterLink],
  templateUrl: './character-detail.html',
  styleUrl: './character-detail.css'
})
export class CharacterDetail {
  characters = input.required<Item[]>();
  characterService = inject(CharacterService);

  prefetchData(number:number) {
    this.characterService.prefetchCharacter(number.toString());
  }

}
