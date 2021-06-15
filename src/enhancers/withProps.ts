import {useMemo} from 'react';
import {PROPS, isFunction, StringKeyMap, EnhancerContext, EnhancerResult} from '@truefit/bach';

import {PropertyMap} from '../types';

type MapParts = {
  dependencies: StringKeyMap<unknown>;
  code: string[];
};

export default <T>(map: PropertyMap<T>) =>
  ({generateNewVariable}: EnhancerContext): EnhancerResult => {
    const parts = Object.keys(map).reduce(
      (acc: MapParts, key: string): MapParts => {
        const value = map[key];
        const valueRef = generateNewVariable();
        const valueCode = isFunction(value)
          ? `useMemo(function() { return ${valueRef}(${PROPS}); }, [${PROPS}])`
          : valueRef;

        acc.dependencies[valueRef] = value;
        acc.code.push(`${PROPS}.${key} = ${valueCode};`);

        return acc;
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
