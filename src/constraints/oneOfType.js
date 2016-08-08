export default {
  propType: null,

  build: (possibleTypes) => ({possibleTypes}),

  validate(value, options) {
    if (value == null) return null;

    for(const type of options.possibleTypes) {
      if (this.propType.validate(value, type) === null) return null;
    }

    return {
      message: 'Invalid type',
      expected: 'One of allowed types: [too complex to show]'
    };
  }
}
