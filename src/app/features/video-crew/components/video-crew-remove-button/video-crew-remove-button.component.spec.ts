import { VideoCrewRemoveButtonComponent } from './video-crew-remove-button.component'
import { MockBuilder, MockRender, ngMocks } from 'ng-mocks'
import { VideoCrewModule } from '../../video-crew.module'
import { DetailedCrewMember } from '../../models'
import { Button, IconDirective } from 'carbon-components-angular'

describe('VideoCrewRemoveButtonComponent', () => {
  const crewMember = new DetailedCrewMember('videoId', 'position', 'memberId')
  beforeEach(() => MockBuilder(VideoCrewRemoveButtonComponent, VideoCrewModule))

  it('should create', () => {
    const fixture = MockRender(VideoCrewRemoveButtonComponent, { crewMember })
    expect(fixture.point.componentInstance.crewMember).toEqual(crewMember)

    const button = ngMocks.find('button')
    expect(ngMocks.formatText(button)).toBe(`Remove ${crewMember.memberId} ${crewMember.position} from event`)
    const buttonDirective = ngMocks.findInstance(button, Button)

    expect(buttonDirective.ibmButton).toBe('danger')
    expect(buttonDirective.size).toBe('field')
    expect(buttonDirective.iconOnly).toBeTrue()
    expect(buttonDirective.assistiveTextAlignment).toBe('end')
    expect(buttonDirective.assistiveTextPlacement).toBe('left')
    const svg = ngMocks.find(button, 'svg.bx--btn__icon')
    const icon = ngMocks.findInstance(svg, IconDirective)

    expect(icon.ibmIcon).toBe('delete')
    expect(icon.size).toBe('16')
  })
})
