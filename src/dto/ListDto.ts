import { PaginationStatusDto } from './PaginationDto';

export interface ListDto<Model> {
  items: Model[],
  pagination: PaginationStatusDto,
}
