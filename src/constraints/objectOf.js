export default {
  build: (constraints) => (constraints),
  
  validate(value, constraints, konstraint) {
    if (value == null) return null;

    const objectError = konstraint.getValidator('object').validate(value);
    if (objectError) return objectError;

    const errors = Object.keys(value)
      .map(k => ({key: k, errors: konstraint.validate(value[k], constraints)}))
      .filter(e => !!e.errors);

    return errors.length === 0 ? null : {
      message: 'Invalid values in object',
      errors: errors
    };
  }
}
