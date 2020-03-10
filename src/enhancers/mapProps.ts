import {PROPS, StringKeyMap, EnhancerContext, EnhancerResult} from '@truefit/bach';

export default <T extends StringKeyMap<unknown>, K extends StringKeyMap<unknown>>(
  fn: (props?: T) => K,
) => ({generateNewVariable}: EnhancerContext): EnhancerResult => {
  const fnName = generateNewVariable();

  return {
    dependencies: {
      [fnName]: fn,
    },
    initialize: `${PROPS} = ${fnName}(${PROPS})`,
    props: [],
  };
};
