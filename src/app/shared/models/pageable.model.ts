import { Sort } from './sort.model';

export class Pageable {
  constructor(
    public sort: Sort,
    public offset: number,
    public pageNumber: number,
    public pageSize: number,
    public paged: boolean,
    public unpaged: boolean
  ) {}
}
