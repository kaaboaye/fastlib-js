import { FEnumerable } from "./enumerable";

export interface FIterator<T> extends FEnumerable<T, FIterator<T>> {
  map(callbackfn: (value: T, index: number, vector: FIterator<T>) => T): this;
}

export function FIterator<T>(
  // tslint:disable-next-line: no-any
  enumerable?: FEnumerable<T, any> | T[]
): FIterator<T> {
  const arr: T[] = (() => {
    if (enumerable === undefined) {
      return [];
    }

    if (enumerable instanceof Array) {
      return enumerable;
    }

    // tslint:disable-next-line: no-shadowed-variable
    const arr = Array<T>(enumerable.length);
    enumerable.forEach((value, i) => (arr[i] = value));

    return arr;
  })();

  function forEach(
    this: FIterator<T>,
    callbackfn: (element: T, index: number, collection: FIterator<T>) => void
  ): void {
    for (let i = 0; i < arr.length; i += 1) {
      callbackfn(arr[i], i, this);
    }
  }

  function map(
    this: FIterator<T>,
    callbackfn: (value: T, index: number, vector: FIterator<T>) => T
  ): FIterator<T> {
    const newArr: T[] = [];

    for (let i = 0; i < arr.length; i += 1) {
      const newValue = callbackfn(arr[i], i, this);
      newArr.push(newValue);
    }

    return FIterator(newArr);
  }

  return {
    map,
    forEach,
    get length(): number {
      return arr.length;
    }
  };
}
