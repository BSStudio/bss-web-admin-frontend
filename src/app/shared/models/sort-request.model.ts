export type Direction = 'asc' | 'desc'

export class SortRequest<T extends Object> {
  constructor(public property: keyof T, public direction?: Direction) {}
}
