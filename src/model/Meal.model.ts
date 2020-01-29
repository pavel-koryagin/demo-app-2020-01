import { MetaModel } from './modelUtils';

export interface Meal {
  id: number,
  userId: number,
  date: string,
  time: string,
  contents: string,
  calories: number,
}

export const mealMetaModel: MetaModel<Meal> = {
  fields: {
    date: {
      visualProps: {
        label: 'Date',
      },
      rules: [],
    },
  }
}

export function splitMealContents(contents: string) {
  const matches = contents.match(/([^\n]*)\n([\s\S]*)/);
  return matches
    ? {
      title: matches[1],
      description: matches[2],
    }
    : {
      title: contents,
      description: null,
    };
}
