export default {
  build: (value) => value,
  
  validate(value, maxValue) {
    if (value == null) return null;
    if (value < maxValue) return null;
    
    return {
      message: 'Invalid value',
      expected: `less than ${maxValue}`,
    };
  }
}
