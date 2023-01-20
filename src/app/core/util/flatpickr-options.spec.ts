import { flatpickrOptions } from './flatpickr-options'

describe('flatpickr-options', () => {
  it('should disable mobile', () => {
    expect(flatpickrOptions).toEqual({ disableMobile: true })
  })
})
