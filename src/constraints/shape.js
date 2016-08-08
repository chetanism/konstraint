export default {
  build: (shape) => (shape),

  validate(value, shape, konstraint) {
    if (value == null) return null;

    const objectError = konstraint.getValidator('object').validate(value);
    if (objectError) return objectError;

    const errors = Object.keys(shape).map(k => {
      const v = value[k] === undefined ? null : value[k];
      const keyErrors = konstraint.validate(v, shape[k]);
      return { key: k, errors: keyErrors };
    }).filter(e => !!e.err);

    return errors.length === 0 ? null : {
      message: 'Invalid values in object',
      errors: errors
    };
  }
}
