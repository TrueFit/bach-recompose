import mapProps from './mapProps';

export default propertyNameMap =>
  mapProps(props =>
    Object.keys(props).reduce((result, key) => {
      const newKey = propertyNameMap[key] || key;
      result[newKey] = props[key];

      return result;
    }, {}),
  );
