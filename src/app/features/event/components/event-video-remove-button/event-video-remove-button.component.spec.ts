import { EventVideoRemoveButtonComponent } from './event-video-remove-button.component'
import { MockBuilder, MockRender, ngMocks } from 'ng-mocks'
import { EventModule } from '../../event.module'
import { Button, IconDirective } from 'carbon-components-angular'
import { DetailedEvent } from '../../models'
import { Video } from '../../../video/models'

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

  beforeEach(() => MockBuilder(EventVideoRemoveButtonComponent, EventModule))

  it('should render', () => {
    MockRender(EventVideoRemoveButtonComponent, { video: video, event: detailedEventWithVideo })

    const removeButton = ngMocks.find('button')
    const removeButtonDirective = ngMocks.findInstance(removeButton, Button)
    expect(removeButtonDirective.ibmButton).toBe('danger')
    expect(removeButtonDirective.size).toBe('field')
    expect(removeButtonDirective.iconOnly).toBeTrue()
    expect(removeButtonDirective.assistiveTextAlignment).toBe('end')
    expect(removeButtonDirective.assistiveTextPlacement).toBe('left')

    const svg = ngMocks.find(removeButton, 'svg.bx--btn__icon')

    const icon = ngMocks.findInstance(svg, IconDirective)
    expect(icon.ibmIcon).toBe('delete')
    expect(icon.size).toBe('16')

    const span = ngMocks.find(removeButton, 'span.bx--assistive-text')
    expect(ngMocks.formatText(span)).toBe(`Remove ${video.title} from event`)
  })
})
