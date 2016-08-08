export default {
  build: (possibleTypes) => possibleTypes,

  validate(value, possibleTypes, konstraint) {
    if (value == null) return null;

    for (const type of possibleTypes) {
      if (konstraint.validate(value, type) === null) return null;
    }

    return {
      message: 'Invalid type',
      expected: 'One of allowed types: [too complex to show]'
    };
  }
}
