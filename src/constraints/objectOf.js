import object from '../types/object';

export default {
  build: (constraints) => ({ constraints }),
  
  validate(value, options) {
    if (value == null) return null;

    const objectError = object.validate(value);
    if (objectError) return objectError;

    const errors = Object.keys(value)
      .map(k => ({key: k, errors: this.propType.validate(value[k], options.constraints)}))
      .filter(e => !!e.errors);

    return errors.length === 0 ? null : {
      message: 'Invalid values in object',
      errors: errors
    };
  }
}
