import { BreadcrumbComponent } from './breadcrumb.component';
import { MockBuilder, MockRender, ngMocks } from 'ng-mocks';
import { Breadcrumb } from 'carbon-components-angular';

describe('BreadcrumbComponent', () => {
  beforeEach(() => {
    return MockBuilder(BreadcrumbComponent);
  });

  it('should create', () => {
    const title = 'title';
    const parentRoute = ['parentRoute'];
    const parentTitle = 'parentTitle';
    MockRender(BreadcrumbComponent, {
      title,
      parentRoute,
      parentTitle,
    });
    const breadcrumb = ngMocks.findInstance(Breadcrumb);
    expect(breadcrumb.noTrailingSlash).toBeTrue();
    expect(breadcrumb.items).toEqual([
      { route: parentRoute, href: `/${parentRoute}`, content: parentTitle },
      { content: title, current: true },
    ]);
  });

  it('should create with defaults', () => {
    MockRender(BreadcrumbComponent, {});
    const breadcrumb = ngMocks.findInstance(Breadcrumb);
    expect(breadcrumb.noTrailingSlash).toBeTrue();
    expect(breadcrumb.items).toEqual([
      { route: [], href: `/`, content: '' },
      { content: '', current: true },
    ]);
  });
});
