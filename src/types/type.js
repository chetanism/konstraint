export default {
  build(typename) {
    return {
      typename: typename
    }
  },
  
  validate(value, options) {
    if (value == null) return null;

    if (typeof value === options.typename) return null;
    return {
      message: 'Invalid Type',
      expected: options.typename,
    };
  }
}
