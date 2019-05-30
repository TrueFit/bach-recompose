import {useMemo} from 'react';
import {PROPS, isFunction} from '@truefit/bach';

export default propertyMap => ({generateNewVariable}) => {
  const parts = Object.keys(propertyMap).reduce(
    (result, key) => {
      const value = propertyMap[key];
      const valueRef = generateNewVariable();
      const valueCode = isFunction(value)
        ? `useMemo(function() { return ${valueRef}(${PROPS}); }, [${PROPS}])`
        : valueRef;

      result.dependencies[valueRef] = value;
      result.code.push(`${PROPS}.${key} = ${valueCode};`);

      return result;
    },
    {dependencies: {}, code: []},
  );

  return {
    dependencies: {
      useMemo,
      ...parts.dependencies,
    },
    initialize: parts.code.join('\n'),
    props: [],
  };
};
