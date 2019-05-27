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

  return {
    dependencies,
    initialize: `
      const didMount = ${map.componentDidMount};
      const didUpdate = ${map.componentDidUpdate};
      const willUnmount = ${map.componentWillUnmount};

      const mounted = useRef(false);
      const previousProps = useRef(null);

      useEffect(function () {
        if (mounted.current && didUpdate) {
          didUpdate(${PROPS}, previousProps.current);
          previousProps.current = ${PROPS};
        }
      }, [${PROPS}]);

      useEffect(function () {
        if (didMount) {
          didMount(${PROPS});
        }

        mounted.current = true;
        previousProps.current = ${PROPS};

        if (willUnmount) {
          return function () {
            willUnmount(previousProps.current);
          };
        }
      }, []);
    `,
    props: [],
  };
};
