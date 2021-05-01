# Haskell 的无穷数组

Haskell是一种标准化的，通用的纯函数式编程语言，有惰性求值和强静态类型。因为有惰性求值，所以在 Haskell 中你可以创建一个无限数组。例如

- [0..], 创建一个 0, 1, 2... 不断递增的数组
- repeat 0, 创建一个全是 0 长度为正无穷的数组
- let a = 1:2:a
    - 创建一个数组 a，第一个元素是 1，第二个元素是2，剩下来的是 a （没错，可以递归定义）
    - 得到一个 [1, 2, 1, 2, 1, 2...] 无限重复的数组

# 用无穷数组解序列问题

无穷数组对序列的描述能力很强。定义符号 "++" 代表链接两个序列，那么

等差数列可以这样描述

$$
f(a_0, b) = [a_0] ++ f(a_0 + b, b)
$$

斐波那契数列的一般描述方式是

$$
f(0) = 1 \newline
f(1) = 1
f(n) = f(n -1) + f(n-2)
$$

但通过递归的无穷数组的方式我们还可以这样表达

- $f(a, b) = [a] ++ f(b, a +b)$
- 斐波那契数列 = $f(1, 1)$

对于下面这道题也可以用递归的方法描述

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b0e88e1993b64700a83505ccbde3ba19~tplv-k3u1fbpfcp-watermark.image)
[原题链接](http://link.zhihu.com/?target=https%3A//www.codewars.com/kata/5672682212c8ecf83e000050)

先卖个关子，看看普通的解决思路是什么样的。

## 一般解法 （TypeScript）

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9be128220d7549d7b563816d266b7dc0~tplv-k3u1fbpfcp-watermark.image)

通过链表实现。

## Haskell 解法

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/886cd1df174443bfb1bd832fec0d813b~tplv-k3u1fbpfcp-watermark.image)

看起来简单很多有没有！

### 理解 Haskell 解法

为了方便理解，我们可以泛化序列 u 的定义到 f(n)


![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1be575eb50994016adefba3cb0b773fc~tplv-k3u1fbpfcp-watermark.image)

在这个定义下，我们需要的序列 u 就等于排序后的 f(1)。

可以注意到 f(n) 符合这样的性质：

$$
f(n) = \{n\} \cup f(2n + 1) \cup f(3n+1)
$$

Haskell 的解法可以理解为通过无穷数组去描述了这个递归的性质。

因为 Haskell 的语法比较与众不同，为了方便理解，下面是将它朴素地翻译成 JS 之后的样子

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/462acef835664c83b3cb92a86bbe7cde~tplv-k3u1fbpfcp-watermark.image)

next 对应上文提到的 $f(n)$。next 中的递归是没有边界条件的，在没有惰性求值特性的 JS 当中就会死循环。而在 Haskell 中，一个数组被定义后其中的值是没有被求出来的，只有当其中的值被最外层的 IO 获取的时候才会去计算具体的值。

而在 JS 中我们是否有语言特性可以实现惰性求值呢？也有！那就是 Generator 。所以我们可以通过 Generator 构造一个类似的解

## 在 JS 中通过 Generator 模仿无穷数组

通过无穷数组我们就可以通过 f(n) 的性质 $f(n) = \{n\} \cup f(2n + 1) \cup f(3n+1)$ 实现：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2e5c34a0c96445d09115809448ab4a10~tplv-k3u1fbpfcp-watermark.image)

**性能对比**

通过 Generator 的方式在性能上一定会有所损耗，以下是 index = 1e6 时的耗时对比。


![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e56d91154ba84745bf7091e861a88760~tplv-k3u1fbpfcp-watermark.image)

性能还是比 Haskell 好的！

# 在 JavaScript 中实现一个惰性数组

## Specification

刚刚的例子中我们仅通过 Generator 模仿了 Haskell 解法，那有没有可能在 JS 当中封装一个惰性数组呢？它需要符合以下规格

- 值的计算是 Lazy 的
- 已经被计算的值会被缓存
- 长度可以是无穷大的
- 数组内容不能被改变
- 可获取长度
- 可以连接几个惰性数组，产生一个新的惰性数组
- 可被遍历
- 可获取指定下标的元素
- 定义可以是递归的

从而我们可以这样使用它

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8be3b5345e2c41f4b261b1a23e7300a4~tplv-k3u1fbpfcp-watermark.image)


![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5f8cc8ec81fa4853888ce4970f7ce5cc~tplv-k3u1fbpfcp-watermark.image)

## v0. 递归 Generator


![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/996d6cfb49824a179b8fae85d4db2a1e~tplv-k3u1fbpfcp-watermark.image)

朴素的 LazyArray 实现（容易爆栈） LazyArray@v0

直接通过递归地调用 self generator 函数就可以完成~

但这个实现方式有一个问题：太容易爆栈了，例如下面的代码就会直接导致溢出。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8d7a48bb63d04da5b370c3cc6546dc1f~tplv-k3u1fbpfcp-watermark.image)

因为在递归的方式中调用栈是这样的


![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/19e4f5d168d44b0c940bba2cd71c9d9c~tplv-k3u1fbpfcp-watermark.image)

而栈的深度有限，根据宿主环境不同在[几千到几万不等](http://link.zhihu.com/?target=https%3A//stackoverflow.com/questions/7826992/browser-javascript-stack-size-limit)。

## v1. 防爆栈优化（存在 Bug）

那有什么方法可以解决这样的爆栈问题呢 —— 将递归转为迭代。

但 LazyArray 的定义是要支持递归的。有什么方法可以让一个递归的定义通过迭代的方式来表达呢？我们可以替换递归过程中使用的函数~

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2a96581939bd456390fafe4d252d1472~tplv-k3u1fbpfcp-watermark.image)

此时我们的调用过程如下图所示，调用栈始终只有一层。

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/692b2072798d4ef69cf41314fb9c04ac~tplv-k3u1fbpfcp-watermark.image)

这下怎么都不会溢出了~

emmmmmm，但是这个版本**是有 Bug 的**。因为这个优化假设了每个 self 函数中 yield 的值都是会被 yield 到最外层的。例如在进行了这一项优化后，下面的例子中的 map 就起不了作用了


![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5f7aa704d7ae4ef2a74018e238f61e35~tplv-k3u1fbpfcp-watermark.image)

因为我们将其中的 self(n) 的 Generator 屏蔽了，导致 map 拿到了空的序列。

所以在进行这项优化时我们还需要判断下一个 self 函数返回的 Generator 是不是直接被上一层的 self 函数的 Generator 消费的。只有这样我们才能进行优化。

## v2. 符合条件才进行转递归为迭代


![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4096a1ea6daf4673bfa90b8bd5495eb4~tplv-k3u1fbpfcp-watermark.image)

使用它重新解一遍 Twice Linear 也是可以的 （😅 写起来的复杂度没啥变化）

```ts
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
```

LazyArray 的实现：[zxch3n/lab](https://github.com/zxch3n/lab/tree/master/lazy-array)

TwiceLinear 相关代码：[zxch3n/blog](https://github.com/zxch3n/blog/tree/master/twice_linear)






