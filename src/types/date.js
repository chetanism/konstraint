import func from '../utils/functionThatRreturnsEmptyObject'

export default {
  build(allowString) {
    return {
      allowString
    }
  },

  validate(value, options) {
    if (value == null) return null;
    if (value instanceof Date) return null;

    return {
      message: 'Invalid type',
      expected: 'Date object'
    };
  }
}
