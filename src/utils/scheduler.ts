import { performUnitOfWork } from './processor';
import { IUnitOfWork, RequestIdleCallbackDeadline } from '../common/types';
import sampleStore, { Node } from './sample';

let workQueue: Node[] = [];
let nextUnitOfWork: IUnitOfWork | null = null;

const ENOUGH_TIME = 2; // Minimum time required to process the next unit

function resetNextUnitOfWork(): void {
  const node = workQueue.shift();
  if (!node) {
    console.log('workQueue is empty');
    return;
  }

  nextUnitOfWork = { triggerNodeId: node.id, node };
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
      sampleStore.endComputation();
      console.log('------- workQueue is empty --------');
  }

  if (nextUnitOfWork || workQueue.length > 0) {
    window.requestIdleCallback(performWork);
  }
}

export function scheduleWork(node: Node): void {
  console.log('scheduleWork for the node: ', node);
  console.time('SCHEDULED-WORK');
  sampleStore.startComputation();

  /**
   * Verify if there is already a work being
   * process that was triggered by the same node
   */
  if (nextUnitOfWork && nextUnitOfWork.triggerNodeId === node.id) {
    stopCurrentWork();
  }

  workQueue.push(node);
  window.requestIdleCallback(performWork);
}

export function stopCurrentWork() {
  console.log('stopping current unit of work');
  nextUnitOfWork = null;
}
