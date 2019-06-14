import {useMemo} from 'react';
import {REACT, PROPS} from '@truefit/bach';

export default (condition, component) => ({generateNewVariable}) => {
  const conditionRef = generateNewVariable();
  const conditionValue = generateNewVariable();
  const componentRef = generateNewVariable();

  return {
    dependencies: {
      useMemo,
      [conditionRef]: condition,
      [componentRef]: component,
    },
    initialize: `const ${conditionValue} = useMemo(function() { return ${conditionRef}(${PROPS}); }, [${PROPS}]);`,
    props: [],
    render: `
      if (${conditionValue}) {
        return ${REACT}.createElement(${componentRef}, ${PROPS});
      }
    `,
  };
};
