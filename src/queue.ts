import { FEnumerable } from "./enumerable";

export interface FQueue<T> extends FEnumerable<T, FQueue<T>> {
  enqueue(elem: T): void;
  dequeue(): T | undefined;
  peek(): T | undefined;
}

// tslint:disable-next-line: class-name
interface QueueNode<T> {
  elem: T;
  next: QueueNode<T> | null;
}

// tslint:disable-next-line: no-any
export function FQueue<T>(enumerable?: FEnumerable<T, any>): FQueue<T> {
  let head: QueueNode<T> | null = null;
  let tail: QueueNode<T> | null = null;
  let length = 0;

  if (enumerable !== undefined) {
    enumerable.forEach(elem => enqueue(elem));
  }

  function enqueue(elem: T): void {
    if (head === null) {
      head = { elem, next: null };
      tail = head;

      return;
    }

    length += 1;
    tail!.next = { elem, next: null };
    tail = tail!.next;
  }

  function dequeue(): T | undefined {
    if (head === null) {
      return undefined;
    }

    length -= 1;
    const elem = head.elem;
    head = head.next;

    return elem;
  }

  function peek(): T | undefined {
    if (head === null) {
      return undefined;
    }

    return head.elem;
  }

  function forEach(
    this: FQueue<T>,
    callbackfn: (elem: T, index: number, queue: FQueue<T>) => void
  ): void {
    if (head === null) {
      return;
    }

    let i = 0;
    for (let node = head; node !== null; node = node.next!) {
      callbackfn(node!.elem, i, this);
      i += 1;
    }
  }

  return {
    enqueue,
    dequeue,
    peek,

    // enumerable
    forEach,
    get length(): number {
      return length;
    }
  };
}
