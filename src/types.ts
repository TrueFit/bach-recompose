export type PropertyMap<T> = {[key: string]: ((t: T | undefined) => unknown) | unknown};
export type CallbackMap<T> = {[key: string]: (t: T | undefined) => unknown};

export type LifecycleMap<T> = {
  componentDidMount: ((props: T | undefined) => void) | undefined;
  componentDidUpdate: ((props: T | undefined, prevProps: T | undefined) => void) | undefined;
  componentWillUnmount: ((props: T | undefined) => void) | undefined;
};
