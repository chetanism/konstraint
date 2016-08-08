import type from './type';
import func from '../utils/functionThatRreturnsEmptyObject';

const typeOptions = type.build('object');

export default {
  build: func,
  validate: (value) => type.validate(value, typeOptions)
};
