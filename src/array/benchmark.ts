import { FBenchmarkStepResult, runBenchmark } from "../benchmark";
import { FEnumerable } from "../enumerable";
import { FIterator } from "../iterator";

export function vectorBenchmark(
  Collection: (
    size?: number | FEnumerable<number, number[]>
  ) => number[] | FIterator<number>
): readonly FBenchmarkStepResult[] {
  return runBenchmark([
    {
      name: "fill",
      run(): void {
        if (Collection() instanceof Array) {
          (Collection(1e7) as number[]).fill(Math.random());
        } else {
          const rand = Math.random();
          Collection({
            length: 1e7,
            forEach: () => rand
          });
        }
      }
    },
    {
      name: "map",
      setup(): number[] | FIterator<number> {
        if (Collection() instanceof Array) {
          return Array(1e7)
            .fill(0)
            .map(() => Math.random());
        }

        return Collection({
          length: 1e7,
          forEach: () => Math.random()
        });
      },
      run(ctx: number[] | FIterator<number>): void {
        ctx.map((v: number) => v + 1);
      }
    },
    {
      name: "forEach",
      setup(): number[] | FIterator<number> {
        if (Collection() instanceof Array) {
          return Array(1e7)
            .fill(0)
            .map(() => Math.random());
        }

        return Collection({
          length: 1e7,
          forEach: () => Math.random()
        });
      },
      run(ctx: number[] | FIterator<number>): void {
        ctx.forEach((v: number) => v + 1);
      }
    }
  ]);
}
