import { Component } from '@angular/core'

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
    <cds-placeholder></cds-placeholder>
  `,
})
export class AppComponent {}
