import {memo, FunctionComponent} from 'react';
import {EnhancerResult} from '@truefit/bach';

export default <T>(
  fn: (prevProps: T | undefined, nextProps: T | undefined) => boolean,
) => (): EnhancerResult => {
  return {
    dependencies: {},
    initialize: '',
    props: [],
    transformComponent: (hoc: FunctionComponent): FunctionComponent => {
      return memo(hoc, fn);
    },
  };
};
