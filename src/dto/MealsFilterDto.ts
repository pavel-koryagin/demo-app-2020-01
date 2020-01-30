export interface MealsFilterDto {
  dateStart: string | null,
  dateEnd: string | null,
  timeStart: string | null,
  timeEnd: string | null,
}

export const noMealsFilter: MealsFilterDto = {
  dateStart: null,
  dateEnd: null,
  timeStart: null,
  timeEnd: null,
};
