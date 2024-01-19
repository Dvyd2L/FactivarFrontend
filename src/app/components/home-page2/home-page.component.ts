import { Component } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { BotonAccesosComponent } from '../boton-accesos/boton-accesos.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { Footer2Component } from '../footer2/footer2.component';
import { HexagonsComponent } from '../hexagons/hexagons.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    NavBarComponent,
    BotonAccesosComponent,
    RouterLink,
    RouterLinkActive,
    FooterComponent,
    Footer2Component,
    HexagonsComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {}
