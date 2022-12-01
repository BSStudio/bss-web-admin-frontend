import { Component } from '@angular/core'

@Component({
  selector: 'app-default-shell',
  styleUrls: ['./default-shell.component.scss'],
  template: `
    <app-header></app-header>
    <main ibmGrid id="app">
      <router-outlet></router-outlet>
    </main>
  `,
})
export class DefaultShellComponent {}
