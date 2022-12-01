import { Component, Input } from '@angular/core'
import { BreadcrumbItem, BreadcrumbModule } from 'carbon-components-angular'

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  template: ` <ibm-breadcrumb [noTrailingSlash]="true" [items]="items"></ibm-breadcrumb> `,
  imports: [BreadcrumbModule],
})
export class BreadcrumbComponent {
  @Input() title = ''
  @Input() parentRoute: unknown[] = []
  @Input() parentTitle = ''
  get items(): BreadcrumbItem[] {
    return [
      { route: this.parentRoute, href: `/${this.parentRoute}`, content: this.parentTitle },
      { content: this.title, current: true },
    ]
  }
}
