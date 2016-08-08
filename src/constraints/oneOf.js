export default {
  build: (possibleValues) => ({possibleValues}),
  
  validate(value, options) {
    if (value == null) return null;

    if (options.possibleValues.indexOf(value) > -1) return null;
    
    return {
      message: 'Invalid value',
      expected: `One of: ${options.possibleValues}`
    };
  }
}
