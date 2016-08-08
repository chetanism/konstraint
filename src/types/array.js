import func from '../utils/functionThatRreturnsEmptyObject';

export default {
  build: func,

  validate(value) {
    if (value == null) return null;
    if (Array.isArray(value)) return null;

    return {
      message: 'Invalid Type',
      expected: 'Array',
    };
  }
};
