import React from 'react';
import { observer } from 'mobx-react';

import BaseExample from './BaseExample';
import { scheduleWork } from '../utils/scheduler';
import { useSampleStore } from '../utils/sample';

const IdleCallbackExample: React.FC = () => {
  const sampleStore = useSampleStore();

  const handleSubmit = () => {
    const cell = sampleStore.data.get('A1')!;
    scheduleWork(cell);
  };

  return <BaseExample onSubmit={handleSubmit} title="Idle Callback Example" />;
};

export default observer(IdleCallbackExample);
