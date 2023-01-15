import { ToastContentRoutedComponent } from './toast-content-routed.component'
import { MockBuilder, MockRender } from 'ng-mocks'
import { SharedModule } from '../../shared.module'
import { ToastContent } from 'carbon-components-angular'

describe('ToastContentRoutedComponent', () => {
  beforeEach(() => MockBuilder(ToastContentRoutedComponent, SharedModule))

  it('should create', () => {
    const toast: ToastContent = {
      type: 'success',
      title: 'title',
      subtitle: 'subtitle',
      links: [
        { text: 'text0', href: 'href0' },
        { text: 'text1', href: 'href1' },
      ],
      caption: 'caption',
    }
    const fixture = MockRender(ToastContentRoutedComponent, { toast })

    expect(fixture.point.componentInstance.toast).toEqual(toast)
  })
})
