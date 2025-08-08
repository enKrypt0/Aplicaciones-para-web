import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CharactersService } from '../../services/characters';
import { ICharacter } from '../../interfaces/icharacter';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-character',
  imports: [RouterModule],
  templateUrl: './character.html',
  styleUrl: './character.css'
})
export class Character implements OnInit {

  id: string = '';

  character: ICharacter = {
    id: 0,
    name: '',
    ki: '',
    maxKi: '',
    race: '',
    gender: '',
    description: '',
    image: '',
    affiliation: '',
    deletedAt: null,
    originPlanet: null as any,
    transformations: []
  };

  transformation = {
    id: 0,
    name: '',
    image: '',
    description: '',
    characterId: 0,
    deleteAt: null
  };

  constructor(
    private service: CharactersService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}
  
  ngOnInit(): void {
    console.log('Character component initialized');
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id') || '';
      console.log('Character ID from route:', this.id);
      if (this.id) {
        console.log('Fetching character with ID:', this.id);
        this.service.getCharacter(Number(this.id)).subscribe({
          next: (data: ICharacter) => {
            this.character = data;
            console.log('Character loaded:', this.character);
            this.cdr.markForCheck(); // Forzar detección de cambios
          },
          error: (error) => {
            console.error('Error loading character:', error);
          }
        });
      }
    });
  }
}