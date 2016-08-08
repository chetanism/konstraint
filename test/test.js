import konstraint from '../src/index';

describe('t1', function () {
  it('ok', function () {
    const k = konstraint.build().number().lessThan(10);
    const e = konstraint.validate(5, k);

    console.log("%j", e);
  });
});