export default {
  build: (constraints) => (constraints),

  validate(value, constraints, konstraint) {
    if (value == null) return null;

    const arrayError = konstraint.getValidator('array').validate(value);
    if (arrayError) return arrayError;

    const errors =  value
      .map((v, i) => ({ index: i, errors: konstraint.validate(v, constraints) }))
      .filter(e => !!e.errors);

    return errors.length === 0 ? null : {
      message: 'Invalid values in array',
      errors: errors
    };
  }
}
