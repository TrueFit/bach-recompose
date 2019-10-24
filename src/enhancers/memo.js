import {memo} from 'react';

export default fn => () => {
  return {
    dependencies: {},
    initialize: '',
    props: [],
    post: hoc => {
      return memo(hoc, fn);
    },
  };
};
