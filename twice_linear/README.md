This is a algorithm question in [codewar](https://www.codewars.com/kata/5672682212c8ecf83e000050).

# Question

Consider a sequence u where u is defined as follows:

- The number `u(0) = 1` is the first one in u.
- For each `x` in `u`, then `y = 2 * x + 1` and `z = 3 * x + 1` must be in u too.
- There are no other numbers in `u`.

## Example:

```
u = [1, 3, 4, 7, 9, 10, 13, 15, 19, 21, 22, 27, ...]
```

1 gives 3 and 4, then 3 gives 7 and 10, 4 gives 9 and 13, then 7 gives 15 and 22 and so on...

## Task:

Given parameter n the function dbl_linear (or dblLinear...) returns the element u(n) of the ordered sequence u (ordered with < so there are no duplicates) .

Example:

dbl_linear(10) should return 22

## Note:

Focus attention on efficiency

# Translation


序列 `u` 的定义如下

- `u(0) = 1`
- 对于 `u` 中的每个值 `x`, `y = 2 * x + 1` 和 `z = 3 * x + 1` 也在 u 当中
- `u` 中没有不符合上述条件的数字
- 序列是递增的，没有重复元素

### Example:

```
u = [1, 3, 4, 7, 9, 10, 13, 15, 19, 21, 22, 27, ...]
```

通过 1 得到 3 和 4， 通过 3 得到 7 和 10， 通过 4 得到 9 和 13， 通过 7 得到 15 和 22 以此类推……

任务，给定数字 `i` 返回 `u(i)`


# Performance

|方法 | 耗时 |
|:- |:- |
| JS 链表 | 350ms |
| JS Generator | 3000ms |
| Haskell | 15000ms | 

# Explain


函数 `f(n)` 返回一个集合，其定义如下

- `n` 处于 `f(n)` 集合中
- 对于 `f(n)` 中的每个值 `x`, `y = 2 * x + 1` 和 `z = 3 * x + 1` 也在 `f(n)` 当中