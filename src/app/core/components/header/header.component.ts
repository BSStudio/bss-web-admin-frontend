import { Component } from '@angular/core'
import { NavigationItem } from 'carbon-components-angular'

@Component({
  selector: 'app-header',
  template: `
    <cds-header brand="BSS" name="site-admin" [route]="['']" [useRouter]="true">
      <cds-hamburger class="cds--header__menu-toggle__hidden" (selected)="toggleHamburger()"></cds-hamburger>
      <cds-header-navigation [navigationItems]="navigationItems"></cds-header-navigation>
      <cds-sidenav
        *ngIf="hasHamburger"
        [navigationItems]="navigationItems"
        class="cds--header__menu-toggle__hidden"
        (click)="toggleHamburger()"
      ></cds-sidenav>
    </cds-header>
  `,
})
export class HeaderComponent {
  public hasHamburger = false
  public readonly navigationItems: NavigationItem[] = [
    { type: 'item', content: $localize`Videos`, route: ['video'], href: 'video' },
    { type: 'item', content: $localize`Events`, route: ['event'], href: 'event' },
    { type: 'item', content: $localize`Members`, route: ['member'], href: 'member' },
  ]

  public toggleHamburger() {
    this.hasHamburger = !this.hasHamburger
  }
}
