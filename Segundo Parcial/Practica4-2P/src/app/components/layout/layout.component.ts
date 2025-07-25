import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, NavbarComponent,FooterComponent],
  templateUrl: './layout.component.html',
  standalone: true,
  styleUrl: './layout.component.css'
})
export default class LayoutComponent {

}

