export default {
  build: (r) => (r === undefined || !!r),
  validate(value, r) {
    if (!r || value != null) return null;
    return {
      message: 'Missing Value'
    };
  }
}
