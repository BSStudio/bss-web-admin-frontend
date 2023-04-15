import { RouterTestingModule } from '@angular/router/testing'
import { MockBuilder, ngMocks } from 'ng-mocks'
import { DefaultShellComponent } from './core/components/shell/default-shell.component'
import { ROUTES } from './routes'
import { Router } from '@angular/router'
import { VideoModule } from './features/video/video.module'
import { ROUTES as HOME_ROUTES } from './features/home/routing'
import { MemberModule } from './features/member/member.module'
import { EventModule } from './features/event/event.module'

describe('ROUTES', () => {
  beforeEach(() => MockBuilder().keep(RouterTestingModule.withRoutes(ROUTES)))

  it('should have a default route with DefaultShellComponent', () => {
    const routes = ngMocks.findInstance(Router)
    const defaultRoute = routes.config.find((route) => route.path === '')

    expect(defaultRoute?.component).toBe(DefaultShellComponent)
  })

  it(`should have a lazy-loaded route for path: '' and module: 'HomeRoutingModule'`, async () => {
    await testLazyLoadedRoute('', HOME_ROUTES)
  })
  it(`should have a lazy-loaded route for path: 'video' and module: 'VideoModule'`, async () => {
    await testLazyLoadedRoute('video', VideoModule)
  })
  it(`should have a lazy-loaded route for path: 'member' and module: 'MemberModule'`, async () => {
    await testLazyLoadedRoute('member', MemberModule)
  })
  it(`should have a lazy-loaded route for path: 'event' and module: 'EventModule'`, async () => {
    await testLazyLoadedRoute('event', EventModule)
  })

  const testLazyLoadedRoute = async (path: string, expectedModule: any) => {
    const routes = ngMocks.findInstance(Router)
    const mainRoute = routes.config.find((route) => route.path === '')
    const route = mainRoute?.children?.find((route) => route.path === path)

    expect(await route?.loadChildren?.()).toEqual(expectedModule)
  }
})
