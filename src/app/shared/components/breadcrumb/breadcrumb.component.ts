import { Component, Input, OnChanges, OnInit } from '@angular/core'
import { BreadcrumbItem, BreadcrumbModule } from 'carbon-components-angular'

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  template: ` <ibm-breadcrumb [noTrailingSlash]="true" [items]="items"></ibm-breadcrumb> `,
  imports: [BreadcrumbModule],
})
export class BreadcrumbComponent implements OnInit, OnChanges {
  @Input() title = ''
  @Input() parentRoute = ''
  @Input() parentTitle = ''
  public items: BreadcrumbItem[] = []

  ngOnInit(): void {
    this.updateItems()
  }

  ngOnChanges(): void {
    this.updateItems()
  }

  private updateItems() {
    this.items = [
      { route: [this.parentRoute], href: `/${this.parentRoute}`, content: this.parentTitle },
      { content: this.title, current: true },
    ]
  }
}
