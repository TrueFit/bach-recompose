import {useCallback} from 'react';
import {PROPS, StringKeyMap, EnhancerContext, EnhancerResult} from '@truefit/bach';
import {CallbackMap} from '../types';

type MapParts = {
  dependencies: StringKeyMap<unknown>;
  functions: string[];
  keys: string[];
};

export default <T>(map: CallbackMap<T>) =>
  ({generateNewVariable}: EnhancerContext): EnhancerResult => {
    const handles = Object.keys(map).reduce(
      (acc: MapParts, key: string) => {
        const alt = generateNewVariable();

        acc.dependencies[alt] = map[key];
        acc.keys.push(key);
        acc.functions.push(`
        const ${key} = useCallback(${alt}(${PROPS}), [${PROPS}]);
      `);

        return acc;
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
