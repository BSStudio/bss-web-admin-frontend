import { Component } from '@angular/core';
import { NavigationItem } from 'carbon-components-angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  hasHamburger = false;
  navigationItems: NavigationItem[] = [
    { content: $localize`Videos`, type: 'item', route: ['video'], href: 'video' },
    { content: $localize`Events`, type: 'item', route: ['event'], href: 'event' },
    { content: $localize`Members`, type: 'item', route: ['member'], href: 'member' },
  ];

  public toggleHamburger() {
    this.hasHamburger = !this.hasHamburger;
  }
}
