// import { solve } from "./solveByGenerator.ts";
import { solve } from "./solveByLazyArray.ts";
// import { solve } from "./solve.ts";
import { answerFirst100 } from "./const.ts";
import { assertEquals } from "https://deno.land/std@0.95.0/testing/asserts.ts";

const answers: [number, number][] = [
  [100000, 2911582],
  [1000, 8488],
];

Deno.test({
  fn() {
    for (let i = 0; i < answerFirst100.length; i++) {
      assertEquals(solve(i), answerFirst100[i]);
    }
  },
  name: "Test first 100",
});

Deno.test({
  fn() {
    answers.forEach(([index, value]) => {
      assertEquals(solve(index), value);
    });
  },
  name: "Test large number",
});
