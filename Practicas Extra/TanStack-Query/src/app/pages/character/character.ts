import { Component, inject } from '@angular/core';
import { CharacterService } from '../../services/character';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-character',
  imports: [ RouterLink ],
  templateUrl: './character.html',
  styleUrl: './character.css'
})
export default class CharacterComponent {
  route = inject(ActivatedRoute);
  characterService = inject(CharacterService);

  characterId = toSignal<string | null>(
    this.route.paramMap.pipe(
      map((params) => params.get('id')),
      tap((id) => this.characterService.setCharacterId(id || ''))
    )
  );

  CharacterQuery = this.characterService.CharactersQuery;

}
