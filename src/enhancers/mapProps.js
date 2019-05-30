import {PROPS} from '@truefit/bach';

export default fn => ({generateNewVariable}) => {
  const fnName = generateNewVariable();

  return {
    dependencies: {
      [fnName]: fn,
    },
    initialize: `${PROPS} = ${fnName}(${PROPS})`,
    props: [],
  };
};
