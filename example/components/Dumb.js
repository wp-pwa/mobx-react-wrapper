import React from 'react';
import wrap from '../../src';

export const Dumb = ({ index, name, addIndex, modifiedName }) => (
  <div>
    <div data-testid="name">
      The React prop "name" is: <strong>{name}</strong>
    </div>
    <div data-testid="index">
      The store prop "index" is: <strong>{index}</strong>
    </div>
    <div data-testid="modifiedName">
      The store view "modifiedName" is: <strong>{modifiedName}</strong>
    </div>
    <button data-testid="addIndex" onClick={addIndex}>
      Increment "index"
    </button>
  </div>
);

export default wrap((store, ownProps) => ({
  index: store.index,
  addIndex: store.addIndex,
  modifiedName: store.modifiedName(ownProps.name),
}))(Dumb);
