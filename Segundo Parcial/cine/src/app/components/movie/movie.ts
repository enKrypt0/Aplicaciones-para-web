import { Component, input, Output } from '@angular/core';
import { IMovie } from '../../../interfaces/IMovie';

@Component({
  selector: 'app-movie',
  imports: [],
  standalone: true,
  templateUrl: './movie.html',
  styleUrl: './movie.css'
})
export class MovieComponent {
  @Input() movie: IMovie = {
    id: 0,
    title: '',
    plot: '',
    image: ''
  };
  @Output() movieSelected: EventEmitter<IMovie> = new EventEmitter<IMovie>();

}
