import {PROPS, isFunction} from '@truefit/bach';

export default map => ({generateNewVariable}) => {
  const keys = Object.keys(map);

  return {
    dependencies: {
      [fnName]: fn,
    },
    initialize: `${PROPS} = ${fnName}(${PROPS})`,
    props: [],
  };
};
