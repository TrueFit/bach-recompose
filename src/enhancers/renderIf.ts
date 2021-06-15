import {ReactNode, useMemo} from 'react';
import {REACT, PROPS, EnhancerContext, EnhancerResult} from '@truefit/bach';
import {Evaluator} from '../types';

export default <T>(condition: Evaluator<T>, component: ReactNode) =>
  ({generateNewVariable}: EnhancerContext): EnhancerResult => {
    const conditionAlias = generateNewVariable();
    const componentAlias = generateNewVariable();

    return {
      dependencies: {
        useMemo,
        [conditionAlias]: condition,
        [componentAlias]: component,
      },
      initialize: `
      if (${conditionAlias}(${PROPS})) {
        return ${REACT}.createElement(${componentAlias}, ${PROPS});
      }
    `,
      props: [],
    };
  };
