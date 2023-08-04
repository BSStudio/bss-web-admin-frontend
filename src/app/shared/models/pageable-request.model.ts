import { SortRequest } from './sort-request.model'

export class PageableRequest<T extends Object> {
  constructor(
    public page?: number,
    public size?: number,
    public sort?: SortRequest<T>[],
  ) {}
}
