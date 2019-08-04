import React from 'react';
import { observer } from 'mobx-react';
import { FixedSizeList as List } from 'react-window';

import { useSampleStore } from '../utils/sample';

const Node = observer(({ style, index, data }) => {
  const item = data[index];
  return (
    <div style={style}>
      <strong>{item.id}</strong>
      <span> | </span>
      <span>{item.formula}</span>
      <span> => </span>
      <span>{item.value || '-'}</span>
    </div>
  );
});

const ListNodes: React.FC = () => {
  const sampleStore = useSampleStore();
  const list = sampleStore.dataList;

  return (
    <List height={500} itemData={list} itemCount={list.length} itemSize={35} width={300}>
      {Node}
    </List>
  );
};

export default observer(ListNodes);
