import {EnhancerContext, EnhancerResult, StringKeyMap} from '@truefit/bach';

import mapProps from './mapProps';

export default <T>(
  propertyNameMap: StringKeyMap<keyof T>,
): ((c: EnhancerContext) => EnhancerResult) =>
  mapProps(props =>
    Object.keys(props).reduce((result: StringKeyMap<unknown>, key: string) => {
      const newKey = propertyNameMap[key] || key;
      // eslint-disable-next-line no-param-reassign
      result[newKey as string] = props[key];

      return result;
    }, {}),
  );
