import { Component } from '@angular/core';

@Component({
  selector: 'app-index',
  template: `
    <h1 i18n>Welcome to the BSS video admin site!</h1>
    <app-metrics></app-metrics>
  `,
})
export class IndexComponent {}
