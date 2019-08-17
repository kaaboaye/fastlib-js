export interface FEnumerable<T, D> {
  length: number;
  forEach(callbackfn: (element: T, index: number, collection: D) => void): void;
}
