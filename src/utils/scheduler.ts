import { performUnitOfWork } from './processor';
import { IUnitOfWork, RequestIdleCallbackDeadline } from '../common/types';
import { Cell } from './sample';

let workQueue: Cell[] = [];
let nextUnitOfWork: IUnitOfWork | null = null;

const ENOUGH_TIME = 1; // Minimum time required to process the next unit

function resetNextUnitOfWork(): void {
  const cell = workQueue.shift();
  if (!cell) {
    console.log('workQueue is empty');
    return;
  }

  nextUnitOfWork = { triggerCellId: cell.id, cell };
}

function workLoop(deadline: any): void {
  if (!nextUnitOfWork) {
    resetNextUnitOfWork();
  }

  while (nextUnitOfWork && deadline.timeRemaining() > ENOUGH_TIME) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }
}

function performWork(deadline: RequestIdleCallbackDeadline): void {
  workLoop(deadline);

  if (!nextUnitOfWork && !workQueue.length) {
      console.timeEnd('SCHEDULED-WORK');
      console.log('------- workQueue is empty --------');
  }

  if (nextUnitOfWork || workQueue.length > 0) {
    window.requestIdleCallback(performWork);
  }
}

export function scheduleWork(cell: Cell): void {
  console.log('scheduleWork for the cell: ', cell);
  console.time('SCHEDULED-WORK');

  /**
   * Verify if there is already a work being
   * process that was triggered by the same cell
   */
  if (nextUnitOfWork && nextUnitOfWork.triggerCellId === cell.id) {
    stopCurrentWork();
  }

  workQueue.push(cell);
  window.requestIdleCallback(performWork);
}

export function stopCurrentWork() {
  console.log('stopping current unit of work');
  nextUnitOfWork = null;
}
