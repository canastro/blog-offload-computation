import React from 'react';
import { action, observable, computed } from 'mobx';

export class Node {
  id: string;

  previousId: string | null = null;
  nextId: string | null = null;

  @observable
  value: number | null = null;

  constructor(data: any) {
    this.id = data.id;
    this.nextId = data.nextId;
    this.previousId = data.previousId;
    this.value = data.value;
  }

  @action
  setValue(value: number | null) {
    this.value = value;
  }
}

class Sample {
  @observable
  data = new Map<string, Node>();

  constructor() {
    this.populate();
  }

  @computed
  get dataList() {
      return Array.from(this.data.values());
  }

  getNodeValue(id: string): number | null {
    const node = this.data.get(id)!;
    return node.value;
  }

  @action
  updateNode(id: string, value: number): void {
    const node = this.data.get(id);

    if (!node) return;
    node.setValue(value);
  }

  @action
  populate() {
    this.data.set(
      'A1',
      new Node({
        id: 'A1',
        nextId: 'A2',
        previousId: null,
        value: 99
      })
    );

    // const N_ELEMENTS = 500000;
    const N_ELEMENTS = 100000;
    for (var i = 0; i !== N_ELEMENTS; i++) {
      const id = `A${i + 2}`;

      this.data.set(
        id,
        new Node({
          id,
          nextId: i !== N_ELEMENTS - 1 ? `A${i + 3}` : null,
          previousId: `A${i + 1}`,
          value: null
        })
      );
    }
  }
}

const sample = new Sample();

export const SampleContext = React.createContext(sample);
export const useSampleStore = (): Sample => React.useContext(SampleContext);
export default sample;
