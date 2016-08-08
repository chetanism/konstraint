export default {
  build: (value) => ({ value }),
  
  validate(value, options) {
    if (value == null) return null;

    if (value > options.value) return null;
    
    return {
      message: 'Invalid value',
      expected: `greater than ${options.value}`,
    };
  }
}
