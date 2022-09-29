import { Sort } from './sort.model';
import { Pageable } from './pageable.model';

export class PaginatedResponse<T> {
  constructor(
    public content: T[],
    public pageable: Pageable,
    public last: boolean,
    public totalPages: number,
    public totalElements: number,
    public size: number,
    public number: number,
    public sort: Sort,
    public first: boolean,
    public numberOfElements: number,
    public empty: boolean
  ) {}
}
