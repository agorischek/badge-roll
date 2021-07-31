import * as Joi from "joi";

export {};
declare global {
  namespace jest {
    interface Matchers<R> {
      toMatchSchema(schema: Joi.Schema, options?: Joi.ValidationOptions): R;
      toBeSchema(): R;
      toBeSchemaLike(): R;
    }
  }
}
