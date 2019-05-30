import {PROPS} from '@truefit/bach';

export default fn => ({generateNewVariable}) => {
  const fnName = generateNewVariable();

  return {
    replacesProps: true,
    dependencies: {
      [fnName]: fn,
    },
    initialize: `${PROPS} = ${fnName}(${PROPS})`,
    props: [],
  };
};
