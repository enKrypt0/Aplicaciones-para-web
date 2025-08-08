import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICharacters } from '../interfaces/icharacters';
import { ICharacter } from '../interfaces/icharacter';


@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  private url: string = 'https://dragonball-api.com/api/characters';

  constructor(
    private http: HttpClient
  ) {}

  getCharacters(): Observable<ICharacters> {
    return this.http.get<ICharacters>(this.url);
  }

  getCharacter(id: number): Observable<ICharacter> {
    return this.http.get<ICharacter>(`${this.url}/${id}`);
  }
  
}
