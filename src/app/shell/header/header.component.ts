import { Component } from '@angular/core';
import { NavigationItem } from 'carbon-components-angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  title = 'web-admin';
  hasHamburger = false;
  navigationItems: NavigationItem[] = [
    { content: 'Videók', type: 'item', route: ['video'] },
    { content: 'Események', type: 'item', route: ['event'] },
    { content: 'Tagok', type: 'item', route: ['member'] },
  ];

  public toggleHamburger() {
    this.hasHamburger = !this.hasHamburger;
  }
}
