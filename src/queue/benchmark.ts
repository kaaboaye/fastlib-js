import { FBenchmarkStepResult, runBenchmark } from "../benchmark";

export function queueBenchmark(queue: {
  enqueue(e: number): void;
  dequeue(): number | undefined;
}): readonly FBenchmarkStepResult[] {
  return runBenchmark([
    {
      name: "seed",
      run(): void {
        for (let i = 0; i < 1e4; i += 1) {
          queue.enqueue(Math.random());
        }
      }
    },
    {
      name: "work",
      run(): void {
        for (let i = 0; i < 1e4; i += 1) {
          queue.enqueue(Math.random());
          queue.enqueue(Math.random());

          queue.dequeue();
        }
      }
    },
    {
      name: "offload",
      run(): void {
        while (queue.dequeue()) {
          // tslint:disable-next-line: no-unused-expression
        }
      }
    }
  ]);
}
