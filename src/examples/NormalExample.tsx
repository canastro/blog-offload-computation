import React from 'react';
import { observer } from 'mobx-react';

import { useSampleStore } from '../utils/sample';
import { performUnitOfWork } from '../utils/processor';
import { IUnitOfWork } from '../common/types';
import BaseExample from './BaseExample';

const IdleCallbackExample: React.FC = () => {
  const sampleStore = useSampleStore();

  const handleSubmit = () => {
    console.time('SEQUENTIAL-WORK');

    const cell = sampleStore.data.get('A1')!;
    let nextUnitOfWork: IUnitOfWork | null = { triggerCellId: cell.id, cell };

    while (nextUnitOfWork) {
      nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    }

    console.timeEnd('SEQUENTIAL-WORK');
    console.log('------- Completed --------');
  };

  return <BaseExample onSubmit={handleSubmit} title="Normal Example" />;
};

export default observer(IdleCallbackExample);
