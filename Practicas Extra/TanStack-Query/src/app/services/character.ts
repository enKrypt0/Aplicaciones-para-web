import { Injectable } from '@angular/core';
import { injectQuery, injectQueryClient } from '@tanstack/angular-query-experimental';
import { getCharacter } from '../actions/getCharacter';
import { signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  private characterId = signal<string | null>(null);

  private queryClient = injectQueryClient();

  setCharacterId(characterId: string) {
    this.characterId.set(characterId);
  }

  CharactersQuery = injectQuery(() => ({
    queryKey: ['characters', this.characterId()],
    queryFn: () => getCharacter(this.characterId()!),
    enabled: !!this.characterId(),
  }));

  prefetchCharacter(characterId: string) {
    this.queryClient.prefetchQuery({
      queryKey: ['characters', characterId],
      queryFn: () => getCharacter(characterId),
      staleTime: 1000 * 60 * 5, // 5 minutes
    });
  }

}