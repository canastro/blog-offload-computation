import React from 'react';
import { observer } from 'mobx-react';

import ListNodes from './ListNodes';
import { useSampleStore } from '../utils/sample';

interface IProps {
  title: string;
  onSubmit: () => void;
}

const BaseExample: React.FC<IProps> = ({ onSubmit, title }) => {
  const sampleStore = useSampleStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    sampleStore.updateNode('A1', Number(e.target.value));
  };

  const handleSubmit = (evt: React.FormEvent) => {
    console.log('submitted');
    evt.preventDefault();
    onSubmit();
  };

  const node = sampleStore.data.get('A1')!;

  return (
    <div>
      <h1>{title}</h1>
      <form onSubmit={handleSubmit}>
        <label>
          A1 value:
          <input type="number" value={node.value || 0} onChange={handleChange} />
        </label>

        <input type="submit" value="Submit" />
      </form>
      <ListNodes />
    </div>
  );
};

export default observer(BaseExample);
