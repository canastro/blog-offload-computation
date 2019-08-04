import React from 'react';
import { action, observable, computed } from 'mobx';

export class Cell {
  id: string;

  @observable
  dependantCellId: string | null = null;

  @observable
  formula: string | null = null;

  @observable
  value: number | null = null;

  constructor(data: any) {
    this.id = data.id;
    this.dependantCellId = data.dependantCellId;
    this.formula = data.formula;
    this.value = data.value;
  }

  @action
  setValue(value: number | null) {
    this.value = value;
  }
}

class Sample {
  @observable
  data = new Map<string, Cell>();

  constructor() {
    this.populate();
  }

  @computed
  get dataList() {
      return Array.from(this.data.values());
  }

  getCellValue(id: string): number | null {
    const cell = this.data.get(id)!;
    return cell.value;
  }

  @action
  updateCell(id: string, value: number): void {
    const cell = this.data.get(id);

    if (!cell) return;
    cell.setValue(value);
  }

  @action
  populate() {
    this.data.set(
      'A1',
      new Cell({
        id: 'A1',
        dependantCellId: 'A2',
        formula: null,
        value: 99
      })
    );

    // const N_ELEMENTS = 500000;
    const N_ELEMENTS = 100000;
    for (var i = 0; i !== N_ELEMENTS; i++) {
      const id = `A${i + 2}`;

      this.data.set(
        id,
        new Cell({
          id,
          dependantCellId: i !== N_ELEMENTS - 1 ? `A${i + 3}` : null,
          formula: `=A${i + 1}+10`,
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
