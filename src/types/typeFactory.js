import type from './type';

export default (typename) => {
  const typeOptions = type.build(typename);
  return {
    parent: 'type',
    build: () => typeOptions,
    validate: type.validate
  };
};
