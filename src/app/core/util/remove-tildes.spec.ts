import { removeTildes } from './remove-tildes'

describe('remove-tildes', () => {
  it('should remove accents from hungarian characters', () => {
    const hungarian = 'árvíztűrő tükörfúrógép'

    expect(removeTildes(hungarian)).toBe('arvizturo tukorfurogep')
  })
})
