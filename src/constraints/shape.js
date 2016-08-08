import object from '../types/object';

export default {
  propType: null,

  build: (shape) => ({shape}),

  validate(value, options) {
    if (value == null) return null;

    const objectError = object.validate(value);
    if (objectError) return objectError;

    const errors = Object.keys(options.shape).map(k => {
      const v = value[k] === undefined ? null : value[k];
      const keyErrors = this.propType.validate(v, options.shape[k]);
      return { key: k, errors: keyErrors };
    }).filter(e => !!e.err);

    return errors.length === 0 ? null : {
      message: 'Invalid values in object',
      errors: errors
    };
  }
}
