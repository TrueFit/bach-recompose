import {FunctionComponent} from 'react';
import {EnhancerResult} from '@truefit/bach';

export default () => (): EnhancerResult => ({
  dependencies: {},
  initialize: '',
  props: [],
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  transformComponent: (): FunctionComponent => () => null,
});
