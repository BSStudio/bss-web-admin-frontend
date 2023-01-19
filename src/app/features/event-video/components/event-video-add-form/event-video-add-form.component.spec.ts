import { EventVideoAddFormComponent } from './event-video-add-form.component'
import { MockBuilder, MockInstance, MockRender, ngMocks } from 'ng-mocks'
import { of } from 'rxjs'
import { VideoService } from '../../../video/services/video.service'
import { DetailedEvent } from '../../../event/models'
import { FormBuilder, FormGroupDirective } from '@angular/forms'
import { EventVideoModule } from '../../event-video.module'
import { Video } from '../../../video/models'
import { EventVideoActionsService } from '../../actions/event-video.actions.service'
import { ComboBox } from 'carbon-components-angular'

describe('EventVideoAddFormComponent', () => {
  const video0 = new Video('0', 'url', 'title', '2022-01-01', true)
  const video1 = new Video('1', 'url', 'title', '2022-01-01', true)
  const detailedEvent = new DetailedEvent('id', 'url', 'title', 'description', 'date', true, [video0])
  beforeEach(() => MockBuilder([EventVideoAddFormComponent, FormBuilder], EventVideoModule))

  it('should show videos that has not been assigned to the video', () => {
    MockInstance(VideoService, 'getAllVideos', () => of([video0, video1]))
    const fixture = MockRender(EventVideoAddFormComponent, { event: detailedEvent })

    expect(fixture.point.componentInstance.event).toEqual(detailedEvent)
    const comboBox = ngMocks.findInstance(ComboBox)
    expect(comboBox.items).toEqual([{ id: video1.id, content: video1.title, selected: false }])
  })

  it('should submit form ', (done) => {
    const updatedDetailedEvent = new DetailedEvent('id', 'url', 'title', 'description', 'date', true, [video0, video1])
    MockInstance(VideoService, 'getAllVideos', () => of([video0, video1]))
    MockInstance(EventVideoActionsService, 'addVideoToEvent', () => of(updatedDetailedEvent))
    const { update, form, videos } = MockRender(EventVideoAddFormComponent, { event: detailedEvent }).point
      .componentInstance

    update.subscribe((actual) => {
      expect(actual).toEqual(updatedDetailedEvent)
      done()
    })

    spyOn(form, 'reset')
    form.patchValue({ video: videos[0] })
    const formElement = ngMocks.find('form')
    const formGroupDirective = ngMocks.findInstance(formElement, FormGroupDirective)
    formGroupDirective.ngSubmit.emit()

    expect(form.reset).toHaveBeenCalledTimes(1)
  })

  it('should have a submit button', () => {
    MockInstance(VideoService, 'getAllVideos', () => of([video0, video1]))
    MockRender(EventVideoAddFormComponent, { event: detailedEvent })

    const form = ngMocks.find('form')
    const button = ngMocks.find(form, 'button')

    expect((<HTMLButtonElement>button.nativeElement).type).toBe('submit')
    expect((<HTMLButtonElement>button.nativeElement).disabled).toBeTrue()
  })
})
