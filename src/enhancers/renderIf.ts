import {ReactNode, useMemo} from 'react';
import {REACT, PROPS, EnhancerContext, EnhancerResult} from '@truefit/bach';

export default <T>(condition: (t?: T) => boolean, component: ReactNode) => ({
  generateNewVariable,
}: EnhancerContext): EnhancerResult => {
  const conditionRef = generateNewVariable();
  const conditionValue = generateNewVariable();
  const componentRef = generateNewVariable();

  return {
    dependencies: {
      useMemo,
      [conditionRef]: condition,
      [componentRef]: component,
    },
    initialize: `
      const ${conditionValue} = useMemo(function() { return ${conditionRef}(${PROPS}); }, [${PROPS}]);
      if (${conditionValue}) {
        return ${REACT}.createElement(${componentRef}, ${PROPS});
      }
    `,
    props: [],
  };
};
