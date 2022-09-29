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
    { content: $localize`Videos`, type: 'item', route: ['video'] },
    { content: $localize`Events`, type: 'item', route: ['event'] },
    { content: $localize`Members`, type: 'item', route: ['member'] },
  ];

  public toggleHamburger() {
    this.hasHamburger = !this.hasHamburger;
  }
}
