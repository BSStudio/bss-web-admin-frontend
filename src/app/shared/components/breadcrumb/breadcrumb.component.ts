import { Component, Input, OnInit } from '@angular/core'
import { BreadcrumbItem, BreadcrumbModule } from 'carbon-components-angular'

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  template: ` <ibm-breadcrumb [noTrailingSlash]="true" [items]="items"></ibm-breadcrumb> `,
  imports: [BreadcrumbModule],
})
export class BreadcrumbComponent implements OnInit {
  @Input() title = ''
  @Input() parentRoute = ''
  @Input() parentTitle = ''
  public items: BreadcrumbItem[] = []

  ngOnInit(): void {
    this.items = [
      { route: [this.parentRoute], href: `/${this.parentRoute}`, content: this.parentTitle },
      { content: this.title, current: true },
    ]
  }
}
