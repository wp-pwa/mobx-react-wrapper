import { types } from 'mobx-state-tree';

export const Store = types
  .model('Store', { index: 1 })
  .views(self => ({
    modifiedName: name => `${name}&${self.index}`,
  }))
  .actions(self => ({
    addIndex: () => (self.index += 1),
  }));

export default Store.create();
