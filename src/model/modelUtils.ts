export type FieldRule<Model> = (value: any, values: Model) => string | undefined;

export interface MetaModel<Model> {
  fields: {
    [name: string]: {
      visualProps: {
        label?: string,
        required?: boolean,
      },
      rules: FieldRule<Model>[],
    }
  }
}
