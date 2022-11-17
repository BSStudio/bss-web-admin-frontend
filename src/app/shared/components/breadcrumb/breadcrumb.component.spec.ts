import { BreadcrumbComponent } from './breadcrumb.component';
import { MockBuilder, MockRender, ngMocks } from 'ng-mocks';
import { SharedModule } from '../../shared.module';
import { Breadcrumb, BreadcrumbItemComponent } from 'carbon-components-angular';

describe('BreadcrumbComponent', () => {
  const title = 'title';
  const route = 'route';
  const routeName = 'routeName';

  beforeEach(() => {
    return MockBuilder(BreadcrumbComponent, SharedModule);
  });

  it('should create', () => {
    MockRender(BreadcrumbComponent, {
      title,
      route,
      routeName,
    });
    const breadcrumb = ngMocks.find(Breadcrumb);
    expect(breadcrumb.componentInstance.noTrailingSlash).toBeTrue();
    const breadcrumbItems = ngMocks.findAll(BreadcrumbItemComponent);
    expect(breadcrumbItems.length).toBe(2);
    const [breadcrumbItem0, breadcrumbItem1] = breadcrumbItems;
    expect(breadcrumbItem0.componentInstance.route).toEqual([route]);
    expect(breadcrumbItem0.componentInstance.href).toEqual(`/${route}`);
    expect(breadcrumbItem0.nativeElement.innerHTML).toBe(routeName);
    expect(breadcrumbItem1.nativeElement.innerHTML).toBe(title);
  });
});
