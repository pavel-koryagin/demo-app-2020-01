import { required, numericality, date } from 'redux-form-validators';
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
    userId: {
      visualProps: {
        label: 'User',
      },
      rules: [required()],
    },
    date: {
      visualProps: {
        label: 'Date',
      },
      rules: [required(), date({ format: 'yyyy-mm-dd' })],
    },
    time: {
      visualProps: {
        label: 'Time',
      },
      rules: [required()],
    },
    contents: {
      visualProps: {
        label: 'Contents and Notes',
      },
      rules: [required()],
    },
    calories: {
      visualProps: {
        label: 'Calories',
      },
      rules: [required(), numericality({ int: true })],
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
