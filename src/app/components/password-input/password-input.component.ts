import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LockCheckboxComponent } from '../lock-checkbox/lock-checkbox.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-password-input',
  standalone: true,
  imports: [FormsModule, LockCheckboxComponent],
  templateUrl: './password-input.component.html',
  styleUrl: './password-input.component.css'
})
export class PasswordInputComponent {
  @Input() placeholder = 'Contraseña';
  showPassword: boolean = false;
  password = '';
  @Output() passwordValueChange = new EventEmitter<string>();
  
  showHidePassword(checked: boolean) {
    this.showPassword = !this.showPassword;
    // this.showPassword = checked;
  }

  emitPassword() {
    this.passwordValueChange.emit(this.password);
  }
}