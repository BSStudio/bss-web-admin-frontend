import { Component, Input, OnChanges } from '@angular/core'
import { BreadcrumbItem, BreadcrumbModule } from 'carbon-components-angular'

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  template: ` <ibm-breadcrumb [noTrailingSlash]="true" [items]="items"></ibm-breadcrumb> `,
  imports: [BreadcrumbModule],
})
export class BreadcrumbComponent implements OnChanges {
  @Input() title = ''
  @Input() parentRoute = ''
  @Input() parentTitle = ''
  public items: BreadcrumbItem[] = []

  ngOnChanges(): void {
    this.items = [
      { route: [this.parentRoute], href: `/${this.parentRoute}`, content: this.parentTitle },
      { content: this.title, current: true },
    ]
  }
}
