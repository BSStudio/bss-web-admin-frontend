import { Component, Input } from '@angular/core'
import { ToastContent } from 'carbon-components-angular'

@Component({
  selector: 'app-toast-content-routed[toast]',
  template: `
    <h3 ibmToastTitle>{{ toast.title }}</h3>
    <div ibmToastSubtitle>
      <span>{{ toast.subtitle }}</span>
      <a ibmLink *ngFor="let link of toast.links" [routerLink]="link.href">{{ link.text }}</a>
    </div>
    <p ibmToastCaption>{{ toast.caption }}</p>
  `,
})
export class ToastContentRoutedComponent {
  @Input() public toast!: ToastContent
}
