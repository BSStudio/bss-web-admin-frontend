import { Component } from '@angular/core'

@Component({
  selector: 'app-default-shell',
  styleUrls: ['./default-shell.component.scss'],
  template: `
    <app-header></app-header>
    <main ibmGrid id="app">
      <router-outlet></router-outlet>
    </main>
    <footer ibmGrid>
      <span>&copy; Copyright {{ year }} Budavári Schönherz Stúdió</span>
      <a href="https://github.com/BSStudio/bss-web-admin-frontend/issues" i18n>Report issue</a>
    </footer>
  `,
})
export class DefaultShellComponent {
  public readonly year = new Date().getFullYear()
}
