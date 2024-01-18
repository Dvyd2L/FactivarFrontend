import { Component } from '@angular/core';
import { HexagonItemComponent } from '@app/components/hexagon-item/hexagon-item.component';

@Component({
  selector: 'app-hexagons',
  templateUrl: './hexagons.component.html',
  styleUrls: ['./hexagons.component.css'],
  standalone: true,
  imports: [HexagonItemComponent],
  providers: [],
})
export class HexagonsComponent {
  
}
