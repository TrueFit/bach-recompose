import {useMemo} from 'react';
import {REACT, PROPS, COMPONENT} from '@truefit/bach';

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
    render: `return ${REACT}.createElement(${conditionValue} ? ${componentRef} : ${COMPONENT}, ${PROPS});`,
  };
};
