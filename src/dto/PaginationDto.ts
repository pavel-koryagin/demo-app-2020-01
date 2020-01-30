export interface PaginationParamsDto {
  page: number,
  pageSize: number,
}

export interface PaginationStatusDto {
  pages: number,
  pageSize: number | null,
  totalSize: number | null,
}

export const DEFAULT_PAGE_SIZE = 1000;
