import { Component } from '@angular/core';
import { NavigationItem } from 'carbon-components-angular';

@Component({
  selector: 'app-header',
  template: `
    <ibm-header brand="BSS" name="site-admin" [route]="['']" [useRouter]="true">
      <ibm-hamburger class="bx--header__menu-toggle__hidden" (selected)="toggleHamburger()"></ibm-hamburger>
      <ibm-header-navigation [navigationItems]="navigationItems"></ibm-header-navigation>
      <ibm-sidenav
        *ngIf="hasHamburger"
        [navigationItems]="navigationItems"
        class="bx--header__menu-toggle__hidden"
      ></ibm-sidenav>
    </ibm-header>
  `,
})
export class HeaderComponent {
  public hasHamburger = false;
  public readonly navigationItems: NavigationItem[] = [
    { type: 'item', content: $localize`Videos`, route: ['video'], href: 'video' },
    { type: 'item', content: $localize`Events`, route: ['event'], href: 'event' },
    { type: 'item', content: $localize`Members`, route: ['member'], href: 'member' },
  ];

  public toggleHamburger() {
    this.hasHamburger = !this.hasHamburger;
  }
}
