export interface PaginationParamsDto {
  page: number,
  pageSize: number,
}

export interface PaginationStatusDto extends PaginationParamsDto {
  totalSize: number,
}

export const DEFAULT_PAGE_SIZE = 1000;
