import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-btn-grow',
  standalone: true,
  imports: [],
  templateUrl: './btn-grow.component.html',
  styleUrl: './btn-grow.component.css',
})
export class BtnGrowComponent {
  @Input() text: string = '';
}
