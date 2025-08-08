import { Injectable } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { getCharacters } from '../actions/getCharacters';
import { signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class CharactersService {

  private characterId = signal<string | null>(null);

  CharactersQuery = injectQuery(()=>({
  queryKey: ['characters'],
  queryFn: () => getCharacters()
}))

}
