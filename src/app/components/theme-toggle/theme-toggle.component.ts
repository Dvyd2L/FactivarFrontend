import { Component } from '@angular/core';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [],
  templateUrl: './theme-toggle.component.html',
  styleUrl: './theme-toggle.component.css',
})
export class ThemeToggleComponent {
  toggle = () => {
    const $body = document.body;

    $body.getAttribute('data-bs-theme') === 'dark'
      ? $body.setAttribute('data-bs-theme', 'light')
      : $body.setAttribute('data-bs-theme', 'dark');
  };
}
