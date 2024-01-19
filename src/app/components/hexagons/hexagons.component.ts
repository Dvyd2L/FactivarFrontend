import { Component } from '@angular/core';
import { HexagonItemComponent } from '@app/components/hexagon-item/hexagon-item.component';
import { AvatarComponent } from '../avatar/avatar.component';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-hexagons',
  templateUrl: './hexagons.component.html',
  styleUrls: ['./hexagons.component.css'],
  standalone: true,
  imports: [HexagonItemComponent, AvatarComponent, RouterLink, RouterLinkActive],
  providers: [],
})
export class HexagonsComponent {
  
}
