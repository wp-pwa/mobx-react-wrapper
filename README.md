# Mobx React Wrapper &middot; [![Build Status](https://travis-ci.org/frontity/mobx-react-wrapper.svg?branch=master)](https://travis-ci.org/frontity/mobx-react-wrapper)

A wrapper tool to wrap/inject mobx in React using just a function. It needs [React Hooks](https://reactjs.org/docs/hooks-reference.html#usestate) underneath.

> Hooks are a new feature proposal that lets you use state and other React features without writing a class. They’re currently in React v16.8.0-alpha and being discussed in an open RFC.

## Installation

`npm i mobx-react-wrapper`

## How to use it

Before your ReactDOM.render, you need to set the store (or stores) like this:

```js
import store from './store';
import { setStore } from 'mobx-react-wrapper';

setStore(store);

ReactDOM.render(<App />, document.getElementById('root'));
```

Then, use `wrap` in any component:

```js
import wrap from 'mobx-react-wrapper';

const NameDisplayer = ({ name }) => <h1>{name}</h1>;

export default wrap(store => ({
  name: store.user.name,
}))(NameDisplayer);
```

## Why to use it

It allows you to:

- Keep your components absolutely dumb. They only receive final props and just have to render.
- Avoid the use of `observer(MyComponent)` everywhere.
- Use named exports to unit test your dumb components, like this:

```js
// Named export for unit testing
export const NameDisplayer = ({ name }) => <h1>{name}</h1>;

// Default export to use in the app
export default wrap(store => ({
  name: store.user.name,
}))(NameDisplayer);
```

- You can also use `setStore` to test your not-so-dumb injected components with a mocked store.
- Keep your React tree clean. No more `injected-MyComponent`. The above example would look like this even though `NameDisplayer` is receiving `name` from `store.user.name`:

```html
<App><NameDisplayer /></App>
```

## API

### `setStore(store)`

Used before React renders to save the reference to the store or stores. It will be passed to `wrap`.

A single store:

```js
import wrap, { setStore } from 'mobx-react-wrapper';
import store from './store';

setStore(store);

const NameDisplayer = ({ name }) => <h1>{name}</h1>;

wrap(store => ({
  name: store.user.name,
}))(NameDisplayer);
```

Multiple stores:

```js
import wrap, { setStore } from 'mobx-react-wrapper';
import userStore from './stores/user';
import uiStore from './stores/ui';

setStore({ user: userStore, ui: uiStore });

const NameDisplayer = ({ name }) => <h1>{name}</h1>;

wrap(stores => ({
  name: stores.user.name,
}))(NameDisplayer);
```

### `wrap(mapper)`

`wrap` works like the old mobx-react `inject` (https://github.com/mobxjs/mobx-react#customizing-inject) with a custom mapper:

```js
mapper: (store, ownProps) => additionalProps;
```

The mapper funciton receives the props of the component as a second argument, so you can use them with your store:

```js
wrap((store, ownProps) => ({
  name: store.users[ownProps.userId].name,
}));
```

It uses the hook `useObserver` underneath, which means the mapper function is observed like `autorun` or `reaction`. Once an observable changes, that component is rendered again.

It adopts the form of a HOC (high order component) so you can compose it, but thanks to hooks it is not a HOC, so it doesn't add an extra component to your React tree:

```js
const mapper = store => ({ name: store.user.name });

wrap(mapper)(Component);
```

## Typescript support

At this moment, `mobx-react-wrapper` doesn't support Typescript but PRs are welcomed :)

## Changelog

This project adheres to [Semantic Versioning](https://semver.org/) and [Angular Conventional Changelog](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines).
Every release is documented on the [Github Releases](https://github.com/frontity/frontity/releases) page.

## License

This project is licensed under the terms of the [Apache 2.0](https://oss.ninja/apache-2.0/?organization=Worona%20Labs%20SL) license.
