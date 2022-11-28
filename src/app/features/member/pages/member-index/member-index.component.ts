import { Component } from '@angular/core';

@Component({
  selector: 'app-member-index',
  template: `
    <h1 i18n>Member manager</h1>
    <article>
      <p i18n>A short description will be added here</p>
    </article>
    <app-member-table></app-member-table>
  `,
})
export class MemberIndexComponent {}
