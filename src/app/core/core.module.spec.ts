import { MockBuilder, MockRender, ngMocks } from 'ng-mocks'
import { CoreModule } from './core.module'
import { I18n, IconService } from 'carbon-components-angular'
// @ts-ignore
import { Renew16, View16, ViewOffFilled16 } from '@carbon/icons'

describe('CoreModule', () => {
  beforeEach(() => MockBuilder(CoreModule).mock(IconService).mock(I18n))

  it('should render', () => {
    MockRender()
    const iconService = ngMocks.findInstance(IconService)
    const i18n = ngMocks.findInstance(I18n)

    expect(iconService.register).toHaveBeenCalledTimes(3)
    expect(iconService.register).toHaveBeenCalledWith(Renew16)
    expect(iconService.register).toHaveBeenCalledWith(View16)
    expect(iconService.register).toHaveBeenCalledWith(ViewOffFilled16)
    expect(i18n.setLocale).toHaveBeenCalledTimes(1)
  })
})
