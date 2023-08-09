import { EventVideoRemoveButtonComponent } from './event-video-remove-button.component'
import { MockBuilder, MockRender, ngMocks } from 'ng-mocks'
import { Button, IconDirective } from 'carbon-components-angular'
import { DetailedEvent } from '../../../event/models'
import { Video } from '../../../video/models'
import { EventVideoModule } from '../../event-video.module'

describe('EventVideoRemoveButtonComponent', () => {
  const video = new Video('id', 'url', 'title', 'uploadedAt', true)
  const detailedEventWithVideo: DetailedEvent = {
    id: 'id',
    url: 'url',
    title: 'title',
    description: 'description',
    date: 'date',
    visible: true,
    videos: [video],
  }

  beforeEach(() => MockBuilder(EventVideoRemoveButtonComponent, EventVideoModule))

  it('should render', () => {
    MockRender(EventVideoRemoveButtonComponent, { video: video, event: detailedEventWithVideo })

    const removeButton = ngMocks.find('button')
    const removeButtonDirective = ngMocks.findInstance(removeButton, Button)
    expect(removeButtonDirective.cdsButton).toBe('danger--ghost')
    expect(removeButtonDirective.size).toBe('field')
    expect(removeButtonDirective.iconOnly).toBeTrue()

    const svg = ngMocks.find(removeButton, 'svg.cds--btn__icon')

    const icon = ngMocks.findInstance(svg, IconDirective)
    expect(icon.cdsIcon).toBe('delete')
    expect(icon.size).toBe('16')

    const span = ngMocks.find(removeButton, 'span.cds--assistive-text')
    expect(ngMocks.formatText(span)).toBe(`Remove ${video.title} from event`)
  })
})
