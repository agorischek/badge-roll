expect.extend({
  toMatchSchema(received, schema, options) {
    const { error } = schema.validate(received, options);
    if (error) return { message: () => `${error}`, pass: false };
    else return { message: () => "Matched schema", pass: true };
  },
});
