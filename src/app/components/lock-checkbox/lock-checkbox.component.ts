import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-lock-checkbox',
  standalone: true,
  imports: [],
  templateUrl: './lock-checkbox.component.html',
  styleUrl: './lock-checkbox.component.css',
})
export class LockCheckboxComponent {
  @Input() isChecked = false;
  @Output() lockCheckboxChange: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  onChange() {
    this.lockCheckboxChange.emit(!this.isChecked);
  }
}
