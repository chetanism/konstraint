import type from './types/type';
import typeFactory from './types/typeFactory';

import arrayOf from './constraints/arrayOf';
import objectOf from './constraints/objectOf';
import anyOne from './constraints/anyOne';
import shape from './constraints/shape';

import req from './constraints/required';
import greaterThan from './constraints/greaterThan';
import lessThan from './constraints/lessThan';
import oneOf from './constraints/oneOf';

class Konstraint {
  validators = new Map;

  constructor() {
    this.register('required', req);

    this.register('type', type);
    this.register('number', typeFactory('number'));
    this.register('bool', typeFactory('boolean'));
    this.register('func', typeFactory('function'));
    this.register('array', typeFactory('array'));
    this.register('object', typeFactory('object'));
    this.register('date', typeFactory('date'));
    this.register('string', typeFactory('string'));
    this.register('symbol', typeFactory('symbol'));

    this.register('greaterThan', greaterThan);
    this.register('lessThan', lessThan);
    this.register('oneOf', oneOf);

    this.register('arrayOf', arrayOf);
    this.register('objectOf', objectOf);
    this.register('anyOne', anyOne);
    this.register('shape', shape);
  }

  register(name, validator) {
    this.validators.set(name, validator);
  }

  getValidator(name) {
    return this.validators.get(name);
  }

  build() {
    const getHandler = (target, name, receiver) => {
      if (target[name] !== undefined) {
        return target[name];
      }

      const validator = this.getValidator(name);

      if (!validator) return target[name];

      return (...args) => {
        target[validator.parent || name] = validator.build(...args);
        return receiver;
      }
    };

    const constraintHandler = {
      get: getHandler
    };

    return new Proxy({}, constraintHandler);
  }

  validate = (value, constraints) => {
    const errors = Object.keys(constraints)
      .map(c => ({type: c, error: this.validators.get(c).validate(value, constraints[c], this)}))
      .filter(e => !!e.error);

    return errors.length === 0 ? null : errors;
  }
}

export default Konstraint;
