import { vectorBenchmark } from "./array/benchmark";
import { resultsToString } from "./benchmark";
import { FIterator } from "./iterator";
import { FQueue } from "./queue";
import { queueBenchmark } from "./queue/benchmark";

console.log("Starting benchmarks\n");

console.log("Array");
{
  const results = vectorBenchmark(Array);
  console.log(resultsToString(results));
}

console.log("FIter");
{
  // tslint:disable-next-line: no-any
  const results = vectorBenchmark(FIterator as any);
  console.log(resultsToString(results));
}

console.log("FQueue");
{
  const queue = FQueue<number>();
  const results = queueBenchmark(queue);
  console.log(resultsToString(results));
}

console.log("Array based queue");
{
  const arr: number[] = [];
  const results = queueBenchmark({
    enqueue: arr.push,
    dequeue: arr.shift
  });
  console.log(resultsToString(results));
}
