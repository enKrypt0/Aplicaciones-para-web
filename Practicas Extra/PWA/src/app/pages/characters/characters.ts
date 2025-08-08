import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CharactersService } from '../../services/characters';
import { ICharacters } from '../../interfaces/icharacters';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-characters',
  imports: [ RouterModule],
  templateUrl: './characters.html',
  styleUrl: './characters.css'
})
export class Characters implements OnInit {

  dataCollection: ICharacters = {
    items: [],
    meta: { totalItems: 0, itemCount: 0, itemsPerPage: 0, totalPages: 0, currentPage: 0 }, 
    links: { first: '', previous: '', next: '', last: '' }
  };

  constructor ( 
    private apiService: CharactersService,
    private detectChanges: ChangeDetectorRef
   ) {}

  ngOnInit(): void { 
    console.log('Characters component initialized');
    this.loadData();
  }

  private loadData(): void {
    this.apiService.getCharacters().subscribe({
      next: (response: ICharacters) => {
        this.dataCollection = response;
        console.log('Characters loaded:', this.dataCollection);
        console.log('Items count:', this.dataCollection.items.length);
        this.detectChanges.markForCheck(); // Forzar detección de cambios
      }, 
      error: (err) => {
        console.error('Error fetching characters:', err);
      }
    });
  }
}