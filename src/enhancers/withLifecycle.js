import {useRef, useEffect} from 'react';
import {PROPS} from '@truefit/bach';

export default (lifecycle = {}) => ({generateNewVariable}) => {
  const dependencies = {useRef, useEffect};
  const map = {
    componentDidMount: null,
    componentDidUpdate: null,
    componentWillUnmount: null,
  };

  const mapLifecycle = event => {
    map[event] = generateNewVariable();
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
