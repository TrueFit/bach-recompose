export type PropertyMap<T> = {[key: string]: ((t?: T) => unknown) | unknown};
export type CallbackMap<T> = {[key: string]: (t?: T) => unknown};

export type LifecycleMap<T> = {
  componentDidMount: (props?: T) => void | undefined;
  componentDidUpdate: (props?: T, prevProps?: T) => void | undefined;
  componentWillUnmount: (props?: T) => void | undefined;
};
