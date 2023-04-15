import { ToastContentRoutedComponent } from './toast-content-routed.component'
import { MockBuilder, MockRender, ngMocks } from 'ng-mocks'
import { SharedModule } from '../../shared.module'
import { Link, ToastCaption, ToastSubtitle, ToastTitle } from 'carbon-components-angular'
import { RouterLink } from '@angular/router'

describe('ToastContentRoutedComponent', () => {
  const toast = {
    type: 'success',
    title: 'title',
    subtitle: 'subtitle',
    links: [
      { text: 'text0', href: 'href0' },
      { text: 'text1', href: 'href1' },
    ],
    caption: 'caption',
  }

  beforeEach(() => MockBuilder(ToastContentRoutedComponent, SharedModule))

  it('should have a title', () => {
    MockRender(ToastContentRoutedComponent, { toast })

    const h3 = ngMocks.find('h3')
    ngMocks.findInstance(h3, ToastTitle)

    expect(ngMocks.formatText(h3)).toEqual(toast.title)
  })

  it('should have a subtitle', () => {
    MockRender(ToastContentRoutedComponent, { toast })

    const div = ngMocks.find('div')
    ngMocks.findInstance(div, ToastSubtitle)
    const span = ngMocks.find('span')

    expect(ngMocks.formatText(span)).toEqual(toast.subtitle)
  })

  it('should have links', () => {
    MockRender(ToastContentRoutedComponent, { toast })

    const div = ngMocks.find('div')
    ngMocks.findInstance(div, ToastSubtitle)
    const [link0, link1] = ngMocks.findAll('a')
    const routerLink0 = ngMocks.findInstance(link0, RouterLink)
    const routerLink1 = ngMocks.findInstance(link1, RouterLink)
    ngMocks.findInstance(link0, Link)
    ngMocks.findInstance(link1, Link)

    expect(ngMocks.formatText(link0)).toBe(toast.links[0].text)
    expect(ngMocks.formatText(link1)).toBe(toast.links[1].text)
    expect(routerLink0.routerLink).toBe(toast.links[0].href)
    expect(routerLink1.routerLink).toBe(toast.links[1].href)
  })

  it('should have a caption', () => {
    MockRender(ToastContentRoutedComponent, { toast })

    const p = ngMocks.find('p')
    ngMocks.findInstance(p, ToastCaption)

    expect(ngMocks.formatText(p)).toEqual(toast.caption)
  })
})
