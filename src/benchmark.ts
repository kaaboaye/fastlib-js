export interface FBenchmarkStepResult {
  readonly name: string;
  readonly begin: Date;
  readonly end: Date;
}

export function runBenchmark<T>(
  steps: ({
    name: string;
    setup?(): T;
    run(ctx: T): void;
  })[]
): readonly FBenchmarkStepResult[] {
  return steps.map(({ name, setup, run }) => {
    const ctx = setup ? setup() : undefined;

    const begin = new Date();
    run(ctx!);
    const end = new Date();

    return { name, begin, end };
  });
}

export function resultsToString(
  results: readonly FBenchmarkStepResult[]
): string {
  return results
    .map(
      ({ name, begin, end }) => `${name} ${end.getTime() - begin.getTime()}ms`
    )
    .join("\n");
}
