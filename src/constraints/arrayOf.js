import arrayValidator from '../types/array';

export default {
  build: (constraints) => ({ constraints }),

  validate(value, options) {
    if (value == null) return null;

    const arrayError = arrayValidator.validate(value);
    if (arrayError) return arrayError;

    const errors =  value
      .map((v, i) => ({ index: i, errors: this.propType.validate(v, options.constraints) }))
      .filter(e => !!e.errors);

    return errors.length === 0 ? null : {
      message: 'Invalid values in array',
      errors: errors
    };
  }
}
