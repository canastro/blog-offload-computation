import sample from './sample';
import { IUnitOfWork } from '../common/types';

const iterations = 25;
const multiplier = 1000;
function doPointlessComputationsWithBlocking(): number[] {
  const primes = [];
  for (let i = 0; i < iterations; i++) {
    const candidate = i * (multiplier * Math.random());
    let isPrime = true;
    for (var c = 2; c <= Math.sqrt(candidate); ++c) {
      if (candidate % c === 0) {
        // not prime
        isPrime = false;
        break;
      }
    }
    if (isPrime) {
      primes.push(candidate);
    }
  }
  return primes;
}

export function performUnitOfWork(unitOfWork: IUnitOfWork): IUnitOfWork | null {
  const { cell, triggerCellId } = unitOfWork;

  if (cell.formula) {
    // hardcoded formula matcher
    const [, parentId, addingValue] = cell.formula.match(/(\w\d+)\+(\d+)/)!;
    const previousValue = sample.getCellValue(parentId) || 0;
    const newValue = previousValue + Number(addingValue);

    sample.updateCell(cell.id, newValue);
  }

  doPointlessComputationsWithBlocking();

  if (!cell.dependantCellId) return null;

  const nextCell = sample.data.get(cell.dependantCellId);
  if (!nextCell) return null;

  /**
   * Keeping the triggerCellId will allow us to know at all times
   * which cell triggered the current computation
   */
  return { triggerCellId, cell: nextCell };
}
