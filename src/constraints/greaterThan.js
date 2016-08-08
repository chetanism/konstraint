export default {
  build: (value) => value,
  
  validate(value, minValue) {
    if (value == null) return null;

    if (value > minValue) return null;
    
    return {
      message: 'Invalid value',
      expected: `greater than ${minValue}`,
    };
  }
}
