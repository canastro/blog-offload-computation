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
  const { node, triggerNodeId } = unitOfWork;

  if (node.previousId) {
    const previousValue = sample.getNodeValue(node.previousId) || 0;
    const newValue = previousValue + 10;

    sample.updateNode(node.id, newValue);
  }

  doPointlessComputationsWithBlocking();

  if (!node.nextId) return null;

  const nextNode = sample.data.get(node.nextId);
  if (!nextNode) return null;

  /**
   * Keeping the triggerNodeId will allow us to know at all times
   * which node triggered the current computation
   */
  return { triggerNodeId, node: nextNode };
}
