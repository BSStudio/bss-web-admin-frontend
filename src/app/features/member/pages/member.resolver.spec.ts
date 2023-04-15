import { Location } from '@angular/common'
import { RouterTestingModule } from '@angular/router/testing'
import { MockBuilder, MockRender, NG_MOCKS_ROOT_PROVIDERS, ngMocks } from 'ng-mocks'
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router'
import { of } from 'rxjs'
import { fakeAsync, tick } from '@angular/core/testing'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { MemberResolver } from './member.resolver'
import { MemberModule } from '../member.module'
import { MemberService } from '../services/member.service'
import { MemberIdComponent } from './member-id/member-id.component'
import { Member, MemberStatus } from '../models'

describe('EventResolver', () => {
  beforeEach(() =>
    MockBuilder(
      [
        MemberResolver,
        RouterModule,
        RouterTestingModule.withRoutes([]),
        HttpClientTestingModule,
        NG_MOCKS_ROOT_PROVIDERS,
      ],
      MemberModule
    )
  )

  it('should return member', fakeAsync(() => {
    const fixture = MockRender(RouterOutlet, {})
    const router = fixture.point.injector.get(Router)
    const location = fixture.point.injector.get(Location)
    const dataService = fixture.point.injector.get(MemberService)

    // DataService has been replaced with a mock copy,
    // let's set a custom value we will assert later on.
    const memberId = 'memberId'
    const member = new Member(
      memberId,
      'url',
      'name',
      'nickname',
      'description',
      'joinedAt',
      'role',
      MemberStatus.ALUMNI,
      false
    )
    dataService.getMember = () => of(member)

    // Let's switch to the route with the resolver.
    location.go(`/${memberId}`)

    // Now we can initialize navigation.
    if (fixture.ngZone) {
      fixture.ngZone.run(() => router.initialNavigation())
      tick() // is needed for rendering of the current route.
    }

    // Checking that we are on the right page.
    expect(location.path()).toEqual(`/${memberId}`)

    // Let's extract ActivatedRoute of the current component.
    const el = ngMocks.find(MemberIdComponent)
    const route: ActivatedRoute = el.injector.get(ActivatedRoute)

    // Now we can assert that it has expected data.
    expect(route.snapshot.data['member']).toEqual(member)
  }))
})
