import array from './types/array';
import bool from './types/boolean';
import date from './types/date';
import func from './types/function';
import number from './types/number';
import type from './types/type';
import object from './types/object';
import string from './types/string';
import symbol from './types/symbol';

import arrayOf from './constraints/arrayOf';
import objectOf from './constraints/objectOf';
import oneOfType from './constraints/oneOfType';
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
    this.register('number', number);
    this.register('bool', bool);
    this.register('func', func);
    this.register('array', array);
    this.register('object', object);
    this.register('date', date);
    this.register('string', string);
    this.register('symbol', symbol);

    this.register('greaterThan', greaterThan);
    this.register('lessThan', lessThan);
    this.register('oneOf', oneOf);

    this.register('arrayOf', arrayOf, true);
    this.register('objectOf', objectOf, true);
    this.register('oneOfType', oneOfType, true);
    this.register('shape', shape, true);
  }

  register(name, validator, needsPropType = false) {
    const copy = needsPropType ? Object.create(validator) : validator;
    this.validators.set(name, copy);
    if (needsPropType) copy.propType = this;

    this[name] = (...args) => {
      
    }
  }

  build() {
    const getHandler = (target, name, receiver) => {
      if (target[name]) {
        return target[name];
      }

      const validator = this.validators.get(name);

      if (!validator) return target[name];

      return (...args) => {
        target.push({ type: name, options: validator.build(...args)});
        return receiver;
      }
    };

    const constraintHandler = {
      get: getHandler
    };

    return new Proxy([], constraintHandler);
  }

  validate = (value, constraints) => {
    const errors = constraints
      .map(c => this.validators.get(c.type).validate(value, c.options))
      .filter(e => !!e);

    return errors.length === 0 ? null : errors;
  }
}

export default Konstraint;
