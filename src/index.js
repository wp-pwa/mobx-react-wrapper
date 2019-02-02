import { useObserver } from 'mobx-react-lite';

Object.defineProperty(exports, '__esModule', {
  value: true,
});

let store = null;

export const setStore = newStore => {
  store = newStore;
};

const wrap = selector => baseComponent => {
  const component = ownProps => {
    if (store === null)
      throw new Error('Please, use setStore before your ReactDOM.render call');
    return useObserver(() =>
      baseComponent({ ...ownProps, ...selector(store, ownProps) }),
    );
  };
  component.displayName = baseComponent.name;
  return component;
};

export default wrap;
