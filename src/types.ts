import {StringKeyMap} from '@truefit/bach';

export type HandlerWithParameter<T, R> = (t: T) => R;
export type HandlerWithoutParameter<R> = () => R;

export type PropertyMap<T> =
  | {
      [key: string]: HandlerWithParameter<T, unknown> | HandlerWithoutParameter<unknown>;
    }
  | StringKeyMap<T>;

export type CallbackMap<T> = {
  [key: string]: HandlerWithParameter<T, unknown> | HandlerWithoutParameter<unknown>;
};

export type LifecycleDidUpdateHandler<T> =
  | ((props: T, prevProps: T) => void)
  | ((props: T) => void)
  | (() => void);

export type LifecycleMap<T> = {
  componentDidMount: HandlerWithParameter<T, void> | HandlerWithoutParameter<void> | undefined;
  componentDidUpdate: LifecycleDidUpdateHandler<T> | undefined;
  componentWillUnmount: HandlerWithParameter<T, void> | HandlerWithoutParameter<void> | undefined;
};

export type HasChanged<T> =
  | ((prevProps: T, nextProps: T) => boolean)
  | ((prevProps: T) => boolean)
  | (() => boolean);

export type Evaluator<T> = ((t: T) => boolean) | (() => boolean);
