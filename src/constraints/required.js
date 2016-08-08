import func from '../utils/functionThatRreturnsEmptyObject';

export default {
  build: func,
  validate(value) {
    if (value != null) return null;
    return {
      message: 'Missing Value'
    };
  }
}
