import { Component, OnInit } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-gist',
  template: `
    <iframe
      [src]="gistUrl"
      frameborder="0"
      scrolling="no"
    ></iframe>
  `,
  styles: [
    `
      iframe {
        border: 1px solid #ddd;
        width: 100%;
        height: 100%;
      }
    `,
  ],
})
export class GistComponent implements OnInit {
  gistUrl =
    'https://gist.github.com/Dvyd2L/a3790d8063962c3d50a30d6b48d42901.js';
  constructor() {}

  ngOnInit() {}
}
