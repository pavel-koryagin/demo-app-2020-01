export type FieldRule<Type = any, Model = {}> = (value: Type, values?: Model, props?: any, name?: any) => string | undefined;

export interface MetaModel<Model> {
  fields: {
    [name: string]: {
      visualProps: {
        label?: string,
        required?: boolean,
      },
      rules: FieldRule<any, Model>[],
    }
  }
}
