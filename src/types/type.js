export default {
  build: (typename) => typename,
  
  validate(value, typename) {
    if (value == null) return null;

    if (typeof value === typename) return null;
    if (typename === 'array' && Array.isArray(value)) return null;
    if (typename === 'date' && value instanceof Date) return null;

    return {
      message: 'Invalid Type',
      expected: typename,
    };
  }
}
