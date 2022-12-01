import { Component } from '@angular/core'

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
    <ibm-placeholder></ibm-placeholder>
  `,
})
export class AppComponent {}
