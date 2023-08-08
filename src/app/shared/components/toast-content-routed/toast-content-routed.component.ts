import { Component, Input } from '@angular/core'
import { ToastContent } from 'carbon-components-angular'

@Component({
  selector: 'app-toast-content-routed[toast]',
  template: `
    <h3 cdsToastTitle>{{ toast.title }}</h3>
    <div cdsToastSubtitle>
      <span>{{ toast.subtitle }}</span>
      <a cdsLink *ngFor="let link of toast['links']" [routerLink]="link.href">{{ link.text }}</a>
    </div>
    <p cdsToastCaption>{{ toast.caption }}</p>
  `,
})
export class ToastContentRoutedComponent {
  @Input() public toast!: ToastContent
}
