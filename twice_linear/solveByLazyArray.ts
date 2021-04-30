import { LazyArray } from "https://raw.githubusercontent.com/zxch3n/lab/master/lazy-array/lazy-array.ts";

function* merge(a: Iterator<number>, b: Iterator<number>) {
  let va = a.next().value!;
  let vb = b.next().value!;
  while (true) {
    if (va < vb) {
      yield va;
      va = a.next().value;
    } else if (va > vb) {
      yield vb;
      vb = b.next().value;
    } else {
      yield vb;
      va = a.next().value;
      vb = b.next().value;
    }
  }
}

const f = LazyArray.createFactory<number, number>((n: number, self) => {
  return LazyArray.concat([n], merge(self(2 * n + 1), self(3 * n + 1)));
});

const ans = f(1);
export function solve(i: number) {
  return ans.get(i);
}
