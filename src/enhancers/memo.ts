import {memo, FunctionComponent} from 'react';
import {EnhancerResult} from '@truefit/bach';
import {HasChanged} from '../types';

export default <T>(fn: HasChanged<T>) => (): EnhancerResult => {
  return {
    dependencies: {},
    initialize: '',
    props: [],
    transformComponent: (hoc: FunctionComponent): FunctionComponent => {
      return memo(hoc, fn);
    },
  };
};
