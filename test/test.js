import konstraint from '../src/index';

describe('t1', function () {
  it('ok', function () {
    const k = konstraint.number().lessThan(10);
    const e = konstraint.validate(15, k);

    console.log("%j", e);
  });
});