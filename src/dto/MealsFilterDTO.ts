export interface MealsFilterDTO {
  dateStart: string | null,
  dateEnd: string | null,
  timeStart: string | null,
  timeEnd: string | null,
}

export const noMealsFilter: MealsFilterDTO = {
  dateStart: null,
  dateEnd: null,
  timeStart: null,
  timeEnd: null,
};
