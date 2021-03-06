# @truefit/bach-recompose

A set of enhancers for [@truefit/bach](https://github.com/TrueFit/bach) inspired by [recompose](https://github.com/acdlite/recompose).

## Installation

```
npm install @truefit/bach-recompose @truefit/bach
```

or

```
yarn add @truefit/bach-recompose @truefit/bach
```

## Enhancers

### Overview

You can read more about the ideas behind [@truefit/bach](https://github.com/TrueFit/bach) in the readme found there. This library is targeted at replicating a decent chunk of the functionality provided by [recompose](https://github.com/acdlite/recompose).

As the author of recompose points out in his deprecation notice, you can accomplish many (although not all) of the same behaviors provided by this library with a combination of hooks. That said, we think there is still merit to writing code that can be understood at a glance without deep knowledge of the frameworks used and in our opinion that is the role many of these functions play.

Not all of the enhancers require hooks to accomplish their tasks, that said, they follow the same architectural design as all enhancers (logic to be combined into a single component).

You can find a full React project with simple working examples of each hook, as well as more complex examples that combine hooks here: [https://github.com/TrueFit/bach-examples](https://github.com/TrueFit/bach-examples).

### mapProps

Allows you to transform the props from that point in the composition into a new map of props.

_Note: this can be a dangerous utility as it completely replaces the props object that has been built to this point. Consider that when writing your mapping logic_

_Enhancer Signature_

| Parameter | Type        | Description                                                                            |
| --------- | ----------- | -------------------------------------------------------------------------------------- |
| fn        | js function | accepts a js object "props" and returns a js object to be used as "props" from then on |

_Example_

#### Typescript

```Typescript
import React from 'react';
import {compose} from '@truefit/bach';
import {mapProps} from '@truefit/bach-recompose';

type PublicProps = {
  note: string;
};

type InternalProps = {
  message: string;
};

const ChildContent = ({message}: InternalProps) => (
  <div>
    <h1>mapProps</h1>
    <h2>Message: {message}</h2>
  </div>
);

const Child = compose<PublicProps>(
  mapProps<PublicProps, InternalProps>(({note, ...props}) => ({message: note, ...props})),
)(ChildContent);

export default () => <Child note="Hello World!" />;
```

#### Javascript

```Javascript
import React from 'react';
import {compose} from '@truefit/bach';
import {mapProps} from '@truefit/bach-recompose';

const ChildContent = ({message}) => (
  <div>
    <h1>mapProps</h1>
    <h2>Message: {message}</h2>
  </div>
);

const Child = compose(
  mapProps(({note, ...props}) => ({message: note, ...props})),
)(ChildContent);

export default () => <Child note="Hello World" />;
```

### withHandlers

Allows you to quickly define multiple withCallback instances in one definition.

_Enhancer Signature_

| Parameter | Type      | Description                                                                                              |
| --------- | --------- | -------------------------------------------------------------------------------------------------------- |
| map       | js object | a js object that contains a map of keys and functions. Each key will be passed to the wrapped component. |

_Example_

#### Typescript

```Typescript
import React from 'react';
import {compose} from '@truefit/bach';
import {withHandlers} from '@truefit/bach-recompose';

type Props = {
  sayHello: () => void;
  sayGoodbye: () => void;
};

const Component = ({sayHello, sayGoodbye}: Props) => (
  <div>
    <h1>With Handlers</h1>
    <div>
      <button type="button" onClick={sayHello}>
        Say Hello
      </button>
    </div>
    <div>
      <button type="button" onClick={sayGoodbye}>
        Say Goodbye
      </button>
    </div>
  </div>
);

export default compose(
  withHandlers<Props>({
    sayHello: () => () => {
      console.log('Hello');
    },
    sayGoodbye: () => () => {
      console.log('Goodbye');
    },
  }),
)(Component);
```

#### Javascript

```Javascript
import React from 'react';
import {compose} from '@truefit/bach';
import {withHandlers} from '@truefit/bach-recompose';

const Component = ({sayHello, sayGoodbye}) => (
  <div>
    <h1>With Handlers</h1>
    <div>
      <button onClick={sayHello}>Say Hello</button>
    </div>
    <div>
      <button onClick={sayGoodbye}>Say Goodbye</button>
    </div>
  </div>
);

export default compose(
  withHandlers({
    sayHello: (props) => () => {
      console.log('Hello');
    },
    sayGoodbye: (props) => () => {
      console.log('Goodbye');
    },
  }),
)(Component);
```

_Underlying React Hook_

[useCallback](https://reactjs.org/docs/hooks-reference.html#usecallback)

#### withLifecycle

Allows for an easier transition from class based components. We use the traditional function names componentDidMount, componentDidUpdate, and componentWillUnmount.

_Enhancer Signature_

| Parameter | Type      | Description                                                                                                                                  |
| --------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| map       | js object | a js object that contains a map of keys and functions. The allowed keys are componentDidMount, componentDidUpdate, and componentWillUnmount. |

_Example_

#### Typescript

```Typescript
import React from 'react';
import {compose} from '@truefit/bach';
import {withLifecycle} from '@truefit/bach-recompose';

const Component = () => (
  <div>
    <h1>With Lifecycle</h1>
  </div>
);

export default compose(
  withLifecycle<any>({
    componentDidMount: props => {
      console.log('Component Did Mount: ', props);
    },

    componentDidUpdate: (props, prevProps) => {
      console.log('Component Did Update', props, prevProps);
    },

    componentWillUnmount: props => {
      console.log('Component Will Unmount', props);
    },
  }),
)(Component);

```

#### Javascript

```Javascript
import React from 'react';
import {compose} from '@truefit/bach';
import {withLifecycle} from '@truefit/bach-recompose';

const Component = () => (
  <div>
    <h1>With Lifecycle</h1>
  </div>
);

export default compose(
  withLifecycle({
    componentDidMount: (props) => {
      console.log('Component Did Mount: ', props);
    },

    componentDidUpdate: (props, prevProps) => {
      console.log('Component Did Update', props, prevProps);
    },

    componentWillUnmount: (props) => {
      console.log('Component Will Unmount', props);
    },
  }),
)(Component);
```

_Underlying React Hooks_

[useEffect](https://reactjs.org/docs/hooks-reference.html#useeffect)
[useRef](https://reactjs.org/docs/hooks-reference.html#useref)

#### renameProp

Allows you to rename a property from one key to another.

_Enhancer Signature_

| Parameter | Type   | Description                        |
| --------- | ------ | ---------------------------------- |
| oldName   | string | the name of the property to rename |
| newName   | string | the new name of the property       |

_Example_

#### Typescript

```Typescript
import React from 'react';
import {compose} from '@truefit/bach';
import {renameProp} from '@truefit/bach-recompose';

type ExternalProps = {
  note: string;
};

type InternalProps = {
  message: string;
};

const ChildContent = ({message}: InternalProps) => (
  <div>
    <h1>renameProp</h1>
    <h2>Message: {message}</h2>
  </div>
);

const Child = compose<ExternalProps>(
  renameProp<InternalProps>('note', 'message')
)(ChildContent);

export default () => <Child note="Hello World" />;
```

#### Javascript

```Javascript
import React from 'react';
import {compose} from '@truefit/bach';
import {renameProp} from '@truefit/bach-recompose';

const ChildContent = ({message}) => (
  <div>
    <h1>renameProp</h1>
    <h2>Message: {message}</h2>
  </div>
);

const Child = compose(
  renameProp('note', 'message'),
)(ChildContent);

export default () => <Child note="Hello World" />;
```

#### renameProps

Allows you to rename multiple properties from one set of keys to another.

_Enhancer Signature_

| Parameter       | Type      | Description                             |
| --------------- | --------- | --------------------------------------- |
| propertyNameMap | js object | a map of the old keys to their new keys |

_Example_

#### Typescript

```Typescript
import React from 'react';
import {compose} from '@truefit/bach';
import {renameProps} from '@truefit/bach-recompose';

type ExternalProps = {
  note: string;
};

type InternalProps = {
  message: string;
};

const ChildContent = ({message}: InternalProps) => (
  <div>
    <h1>renameProp</h1>
    <h2>Message: {message}</h2>
  </div>
);

const Child = compose<ExternalProps>(
  renameProps<InternalProps>({note: 'message'}),
)(ChildContent);

export default () => <Child note="Hello World" />;
```

#### Javascript

```Javascript
import React from 'react';
import {compose} from '@truefit/bach';
import {renameProps} from '@truefit/bach-recompose';

const ChildContent = ({message}) => (
  <div>
    <h1>mapProps</h1>
    <h2>Message: {message}</h2>
  </div>
);

const Child = compose(
  renameProps({note: 'message'}),
)(ChildContent);

export default () => <Child note="Hello World" />;
```

#### renderIf

Allows you to specify a conditional function. If the condition is true, compose will render the specified component

_Enhancer Signature_

| Parameter   | Type            | Description                                      |
| ----------- | --------------- | ------------------------------------------------ |
| conditional | js function     | a function that returns a boolean value          |
| component   | react component | the component to render if the condition is true |

_Example_

#### Typescript

```Typescript
import React from 'react';
import {compose, withEffect, withState} from '@truefit/bach';
import {renderIf} from '@truefit/bach-recompose';

type Props = {
  loading: boolean;
  setLoading: (b: boolean) => void;
};

const Loading = () => <div>Loading</div>;

const Content = () => <div>Content</div>;

export default compose(
  withState('loading', 'setLoading', true),
  withEffect<Props>(({setLoading}) => {
    setTimeout(() => {
      setLoading(false);
    }, 2500);
  }, []),
  renderIf<Props>(({loading}) => loading, Loading),
)(Content);
```

#### Javascript

```Javascript
import React from 'react';
import {compose, withEffect, withState} from '@truefit/bach';
import {renderIf} from '@truefit/bach-recompose';

const Loading = () => <div>Loading</div>;

const Content = () => <div>Content</div>;

export default compose(
  withState('loading', 'setLoading', true),
  withEffect(({setLoading}) => {
    setTimeout(() => {
      setLoading(false);
    }, 2500);
  }, []),
  renderIf(({loading}) => loading, Loading),
)(Content);
```

_Underlying React Hooks_

[useMemo](https://reactjs.org/docs/hooks-reference.html#usememo)

#### renderNothing

Short circuits the render chain and renders nothing.

_Enhancer Signature_

This enhancer has no parameters

_Example_

#### Typescript

```Typescript
import React from 'react';
import {compose} from '@truefit/bach';
import {renderNothing} from '@truefit/bach-recompose';

const Content = () => <div>Something</div>;

export default compose(renderNothing())(Content);
```

#### Javascript

```Javascript
import React from 'react';
import {compose} from '@truefit/bach';
import {renderNothing} from '@truefit/bach-recompose';

const Content = () => <div>Something</div>;

export default compose(renderNothing())(Content);
```

#### withProps

Allows you to supply multiple properties to add the props passed to the wrapped component.

_Enhancer Signature_

| Parameter   | Type      | Description                                              |
| ----------- | --------- | -------------------------------------------------------- |
| propertyMap | js object | a map of the keys to their values (objects or functions) |

_Example_

#### Typescript

```Typescript
import React from 'react';
import {compose} from '@truefit/bach';
import {withProps} from '@truefit/bach-recompose';

type Props = {
  title: string;
  description: string;
};

const WithProps = ({title, description}: Props) => (
  <div>
    <h1>withProps</h1>
    <h2>Title: {title}</h2>
    <h2>Description: {description}</h2>
  </div>
);

export default compose(
  withProps<Props>({
    title: 'Hello',
    description: () => 'World',
  }),
)(WithProps);

```

#### Javascript

```Javascript
import React from 'react';
import {compose} from '@truefit/bach';
import {withProps} from '@truefit/bach-recompose';

const WithProps = ({title, description}) => (
  <div>
    <h1>withProps</h1>
    <h2>Title: {title}</h2>
    <h2>Description: {description}</h2>
  </div>
);

export default compose(
  withProps({
    title: 'Hello',
    description: (props) => 'World'
  }),
)(WithProps);
```

_Underlying React Hooks_

[useMemo](https://reactjs.org/docs/hooks-reference.html#usememo)

#### memo

Allows you to specify a comparison function to optimize the re-rendering of the component.

_Enhancer Signature_

| Parameter | Type    | Description                                                                                                                                                                        |
| --------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| areEqual  | js func | a function that accepts two parameters - prevProps, nextProps and returns a boolean as to if they should be considered equal. If true is returned, the component will not rerender |

_Example_

#### Typescript

```Typescript
import React from 'react';
import {compose, withState, withCallback} from '@truefit/bach';
import {memo} from '@truefit/bach-recompose';

type MemoProps = {
  count: number;
};

const Memo = compose<MemoProps>(
  memo<MemoProps>((prevProps, nextProps) => {
    return nextProps.count % 2 === 0;
  }),
)(({count}: MemoProps) => (
  <>
    <h1>Memo</h1>
    <h2>{count}</h2>
  </>
));

type WrapperProps = {
  count: number;
  setCount: (n: number) => void;

  increment: () => void;
};

export default compose(
  withState<WrapperProps, number>('count', 'setCount', 0),
  withCallback<WrapperProps>('increment', ({count, setCount}) => () => {
    setCount(count + 1);
  }),
)(({count, increment}: WrapperProps) => (
  <div>
    <Memo count={count} />
    <button type="button" onClick={increment}>
      Increment
    </button>
  </div>
));
```

#### Javascript

```Javascript
import React from 'react';
import {compose, withState, withCallback} from '@truefit/bach';
import {memo} from '@truefit/bach-recompose';

const Memo = compose(
  memo((prevProps, nextProps) => {
    return nextProps.count % 2 === 0;
  }),
)(({count}) => (
  <>
    <h1>Memo</h1>
    <h2>{count}</h2>
  </>
));

export default compose(
  withState('count', 'setCount', 0),
  withCallback('increment', ({count, setCount}) => () => {
    setCount(count + 1);
  }),
)(({count, increment}) => (
  <div>
    <Memo count={count} />
    <button onClick={increment}>Increment</button>
  </div>
));
```

_Underlying React HOC_

[memo](https://reactjs.org/docs/react-api.html#reactmemo)
