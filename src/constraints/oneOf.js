export default {
  build: (possibleValues) => (possibleValues),
  
  validate(value, possibleValues) {
    if (value == null) return null;

    if (possibleValues.indexOf(value) > -1) return null;
    
    return {
      message: 'Invalid value',
      expected: `One of: ${possibleValues}`
    };
  }
}
