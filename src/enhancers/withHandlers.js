import {useCallback} from 'react';
import {PROPS} from '@truefit/bach';

export default (map = {}) => ({generateNewVariable}) => {
  const handles = Object.keys(map).reduce(
    (result, key) => {
      const alt = generateNewVariable();

      result.dependencies[alt] = map[key];
      result.keys.push(key);
      result.functions.push(`
        const ${key} = useCallback(function () {
          ${alt}(${PROPS});
        }, [${PROPS}]);
      `);

      return result;
    },
    {
      dependencies: {},
      functions: [],
      keys: [],
    },
  );

  return {
    dependencies: {
      useCallback,
      ...handles.dependencies,
    },
    initialize: handles.functions.join('\n'),
    props: handles.keys,
  };
};
