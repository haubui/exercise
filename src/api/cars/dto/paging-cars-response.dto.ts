import { PaginationDto } from './paging.dto';

export class PagingResponse {
  items: any[];
  pagination: PaginationDto;

  constructor(items: any[], total: number, offset: number, limit: number) {
    this.items = items;
    this.pagination = new PaginationDto(total, offset, limit);
  }
}
