import { Component } from '@angular/core';

@Component({
  selector: 'app-event-index',
  template: `
    <h1 i18n>Event manager</h1>
    <article>
      <p i18n>A short description will be added here</p>
      <p i18n>Lorem ipsum</p>
    </article>
    <app-event-table></app-event-table>
  `,
})
export class EventIndexComponent {}
