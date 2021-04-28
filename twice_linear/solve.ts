import { LinkedList } from "https://deno.land/x/mighty_promise@v0.0.1/mod.ts";

const ans: number[] = [1];
// 2 * x + 1
const a: LinkedList<number> = new LinkedList([3]);
// 3 * x + 1
const b: LinkedList<number> = new LinkedList([4]);

export function solve(index: number) {
  if (ans.length > index) {
    return ans[index];
  }

  while (ans.length <= index) {
    let v: number;
    if (a.tail! < b.tail!) {
      v = a.pop()!;
    } else if (a.tail! > b.tail!) {
      v = b.pop()!;
    } else {
      v = b.pop()!;
      a.pop();
    }

    const newAValue = v * 2 + 1;
    const newBValue = v * 3 + 1;
    a.pushFront(newAValue);
    b.pushFront(newBValue);
    ans.push(v);
  }

  return ans[index];
}
