import {useRef, useEffect} from 'react';
import {PROPS, StringKeyMap, EnhancerContext, EnhancerResult} from '@truefit/bach';
import {LifecycleMap} from '../types';

type MapKeys = {[key: string]: string};

export default <T>(lifecycle: LifecycleMap<T>) => ({
  generateNewVariable,
}: EnhancerContext): EnhancerResult => {
  const dependencies: StringKeyMap<unknown> = {useRef, useEffect};
  const map: MapKeys = {};

  const mapLifecycle = (event: string): void => {
    map[event] = generateNewVariable();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dependencies[map[event]] = lifecycle[event];
  };

  mapLifecycle('componentDidMount');
  mapLifecycle('componentDidUpdate');
  mapLifecycle('componentWillUnmount');

  const MOUNTED = generateNewVariable();
  const PREV_PROPS = generateNewVariable();

  return {
    dependencies,
    initialize: `
      const didMount = ${map.componentDidMount};
      const didUpdate = ${map.componentDidUpdate};
      const willUnmount = ${map.componentWillUnmount};

      const ${MOUNTED} = useRef(false);
      const ${PREV_PROPS} = useRef(null);

      useEffect(function () {
        if (${MOUNTED}.current && didUpdate) {
          didUpdate(${PROPS}, ${PREV_PROPS}.current);
          ${PREV_PROPS}.current = ${PROPS};
        }
      }, [${PROPS}]);

      useEffect(function () {
        if (didMount) {
          didMount(${PROPS});
        }

        ${MOUNTED}.current = true;
        ${PREV_PROPS}.current = ${PROPS};

        if (willUnmount) {
          return function () {
            willUnmount(${PREV_PROPS}.current);
          };
        }
      }, []);
    `,
    props: [],
  };
};
