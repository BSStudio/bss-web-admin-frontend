import { MemberProfilePictureComponent } from './member-profile-picture.component'
import { MockBuilder, MockRender, ngMocks } from 'ng-mocks'
import { MemberModule } from '../../member.module'
import { Member, MemberStatus } from '../../models'

describe('MemberProfilePictureComponent', () => {
  const member = new Member(
    'id',
    'url',
    'name',
    'nickname',
    'description',
    'joinedAt',
    'role',
    MemberStatus.ALUMNI,
    true
  )
  const date = new Date(2022, 1, 1)
  beforeEach(() => {
    jasmine.clock().install()
    jasmine.clock().mockDate(date)
    return MockBuilder(MemberProfilePictureComponent, MemberModule)
  })
  afterEach(() => jasmine.clock().uninstall())

  it('should create', () => {
    const fixture = MockRender(MemberProfilePictureComponent, {
      member,
      showCaption: true,
    })
    expect(fixture.componentInstance.member).toEqual(member)

    const sources = ngMocks.findAll('figure > picture > source')
    expect(sources.map((src) => src.nativeElement.type)).toEqual(
      Array.from(new Array(4), () => ['image/avif', 'image/webp', 'image/jpeg']).flatMap((a) => a)
    )
    expect(sources.map((src) => src.nativeElement.media)).toEqual(Array.from(new Array(12), () => ''))
    expect(sources.map((src) => src.nativeElement.srcset)).toEqual([
      `/media/assets/m/${member.id}/xl.avif`,
      `/media/assets/m/${member.id}/xl.webp`,
      `/media/assets/m/${member.id}/xl.jpeg`,
      `/media/assets/m/${member.id}/lg.avif`,
      `/media/assets/m/${member.id}/lg.webp`,
      `/media/assets/m/${member.id}/lg.jpeg`,
      `/media/assets/m/${member.id}/md.avif`,
      `/media/assets/m/${member.id}/md.webp`,
      `/media/assets/m/${member.id}/md.jpeg`,
      `/media/assets/m/${member.id}/sm.avif`,
      `/media/assets/m/${member.id}/sm.webp`,
      `/media/assets/m/${member.id}/sm.jpeg`,
    ])

    const img = ngMocks.find('figure > picture > img')
    expect(img.nativeElement.alt).toEqual(`${member.name}'s profile picture`)
    expect(img.nativeElement.src).toMatch(/\/assets\/fallback\.jpg$/)
    const figcaption = ngMocks.find('figure > figcaption')
    expect(ngMocks.formatText(figcaption)).toBe(`${member.name}'s profile picture`)
  })

  it('should update', () => {
    const fixture = MockRender(MemberProfilePictureComponent, {
      member,
    })
    fixture.point.componentInstance.updateImage()
    fixture.detectChanges()

    const sources = ngMocks.findAll('figure > picture > source')
    expect(sources.map((src) => src.nativeElement.srcset)).toEqual([
      `/media/assets/m/${member.id}/xl.avif?time=${date.getTime()}`,
      `/media/assets/m/${member.id}/xl.webp?time=${date.getTime()}`,
      `/media/assets/m/${member.id}/xl.jpeg?time=${date.getTime()}`,
      `/media/assets/m/${member.id}/lg.avif?time=${date.getTime()}`,
      `/media/assets/m/${member.id}/lg.webp?time=${date.getTime()}`,
      `/media/assets/m/${member.id}/lg.jpeg?time=${date.getTime()}`,
      `/media/assets/m/${member.id}/md.avif?time=${date.getTime()}`,
      `/media/assets/m/${member.id}/md.webp?time=${date.getTime()}`,
      `/media/assets/m/${member.id}/md.jpeg?time=${date.getTime()}`,
      `/media/assets/m/${member.id}/sm.avif?time=${date.getTime()}`,
      `/media/assets/m/${member.id}/sm.webp?time=${date.getTime()}`,
      `/media/assets/m/${member.id}/sm.jpeg?time=${date.getTime()}`,
    ])

    jasmine.clock().tick(50)
    fixture.point.componentInstance.updateImage()
    fixture.detectChanges()
    expect(fixture.point.componentInstance.refreshParam).toEqual(`?time=${date.getTime() + 50}`)
  })
})
