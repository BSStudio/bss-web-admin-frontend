import { MockBuilder, MockRender, ngMocks } from 'ng-mocks';
import { HeaderComponent } from './header.component';
import { CoreModule } from '../../core.module';
import { Hamburger, Header, HeaderNavigation, NavigationItem, SideNav } from 'carbon-components-angular';

describe('HeaderComponent', () => {
  beforeEach(() => MockBuilder(HeaderComponent, CoreModule));

  const navigationItems: NavigationItem[] = [
    { type: 'item', content: 'Videos', route: ['video'], href: 'video' },
    { type: 'item', content: 'Events', route: ['event'], href: 'event' },
    { type: 'item', content: 'Members', route: ['member'], href: 'member' },
  ];

  it('should render', () => {
    const fixture = MockRender(HeaderComponent);

    expect(fixture.point.componentInstance.hasHamburger).toBeFalse();
    expect(fixture.point.componentInstance.navigationItems).toEqual(navigationItems);

    const header = ngMocks.find(Header);
    expect(header.componentInstance.brand).toBe('BSS');
    expect(header.componentInstance.name).toBe('site-admin');
    expect(header.componentInstance.useRouter).toBeTrue();
    expect(header.componentInstance.route).toEqual(['']);

    const hamburger = ngMocks.find(header, Hamburger);
    expect(hamburger.classes).toEqual({ 'bx--header__menu-toggle__hidden': true });

    const headerNavigation = ngMocks.find(header, HeaderNavigation);
    expect(headerNavigation.componentInstance.navigationItems).toEqual(navigationItems);

    expect(() => ngMocks.find(header, SideNav)).toThrow();
  });

  it('should show sidenav on hamburger click', () => {
    const fixture = MockRender(HeaderComponent);

    expect(fixture.point.componentInstance.hasHamburger).toBeFalse();

    const header = ngMocks.find(Header);

    const hamburger = ngMocks.findInstance(header, Hamburger);
    hamburger.selected.emit({});
    fixture.detectChanges();

    expect(fixture.point.componentInstance.hasHamburger).toBeTrue();

    const sideNav = ngMocks.find(header, SideNav);
    expect(sideNav.componentInstance.navigationItems).toEqual(navigationItems);
    expect(sideNav.classes).toEqual({ 'bx--header__menu-toggle__hidden': true });
  });
});
