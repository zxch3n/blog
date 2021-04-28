function* merge(
  a: Generator<number>,
  b: Generator<number>
): Generator<number, null> {
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

function* next(n: number): Generator<number> {
  yield n;
  yield* merge(next(2 * n + 1), next(3 * n + 1));
}

const iter = next(1);
const ans: number[] = [];
export function solve(index: number) {
  while (ans.length <= index) {
    ans.push(iter.next().value);
  }

  return ans[index];
}
