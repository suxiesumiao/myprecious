
## 题目一
``` javascript
// 立即执行函数
(function()  {    
    return typeof arguments;
    }
)();
```
### 答案：'object'

### `arguments` 是对象, 称之为伪数组, 有两件事要注意这里：
 - 它不是数组, 而是一个数组一样的物体, 你能通过下标找到某个值, 也有 `length` 属性, 大体上长这个样子 `{0: 'aaa', 1: 'bbb', length: 2}`

 - Array.prototype.slice.call(arguments); 转成数组，当然 `arguments` 即使是数组,返回的依然是 'object' ,因为数组也是对象。

 - 附加 [typeof 对类型的判断](https://developer.mozilla.org/zh-CN/docs/JavaScript/Reference/Operators/typeof)


##  题目二
``` javascript
var f = function g(){ return 23; };
typeof g();
```
### 答案：会发生错误

 - 因为 `function g(){ return 23; }` 是函数表达式,事实上只有事一个名字,不是一个函数声明

 - 函数实际上是绑定到变量f，不是 `g` 。

 - 指定的标识符在函数表达式虽然有其用途：堆栈跟踪是清晰而不是充斥着无名的函数，你可以有一个匿名函数递归调用本身不使用 `argument.callee`

 - 附加：非常详细的帖子函数表达式，http://kangax.github.io/nfe/


##  题目三
``` javascript
(function(x){
    delete x;
    return x;
})(1);
```
### 答案：1

## 题目四
``` javascript
var y = 1, x = y = typeof x;    
console.log(x);
```
### 答案：”undefined”

### 通过重写代码如下结果:

 - var a, b; 展开就是 var a; var b;.    
 - A = B = C；相当于 B = C = B；
 - 知道了这一点，我们重写并得到：

``` javascript
var y = 1;
    y = typeof x;
var x = y;
```
## 5  题目五
``` javascript
(function f(f){
    return typeof f();
})(function(){ return 1; });
```
### 答案：”number”

 - 为了便于理解我们继续分解；
 - 第一部分：
 - var baz = function(){ return 1; };
 - 第二部分：
``` javascript
(function f(f){
    return typeof f();
})(baz);
```

 - 在这里，函数f接受一个参数是另一个函数,f函数内部执行这个实参函数并且返回类型。
 - 无论是从调用该函数返回,即使参数名称f与函数名冲突，函数接受本身作为自己的参数然后调用，此时就看谁更 - 具有更高的优先级了，显然，参数的优先级更高，所以实际执行的是return typeof 1。


## 题目六
``` javascript
var foo = {
    bar: function() {
        return this.baz;
    },
    baz: 1
};

(function(){
    return typeof arguments[0]()
})(foo.bar);
```
### 答案：”undefined”


### 为什么是`undefined`？
  我们必须要知道 `this` 运算符是怎么工作的。
  `JS` 语言精粹总结的很精炼:
 - 纯粹的函数调用

 - 作为对象方法的调用

 - 作为构造函数调用

 - `apply` 调用

### 我们看看题目是属于那种环境？

 - 在 `arguments[0]()`中执行了一个方法, `arguments[0]` 就是 `foo.bar` 方法，注意:这在`foo.bar` 中的 `this` 是没有绑定到 `foo`。
 - 虽然 `foo.bar` 传递给了函数，但是真正执行的时候，函数 `bar` 的上下文环境是     `arguments`，并不是 `foo`。
 - `arguemnts[0]` 可以理解为 `arguments.0` （不过写代码就不要这样了，语法会错误的），所以这样看来，
 _ 上下文环境是 `arguemnts` 就没问题了，所以在执行 `baz` 的时候自然 `this` 就是 `window` 了，`window` 上没
 - 有 `baz` 属性，返回的就是 `undefined`，`typeof` 调用的话就转换成 `undefined`了。


## 题目七
``` javascript
var foo = {
    bar: function(){
        return this.baz;
    },
    baz: 1
    }
typeof (f = foo.bar)();
```
答案：”undefined”

继续改写一下：

``` javascript
var foo = {
    bar: function(){ return this.baz; },
    baz: 1
    }
    f = foo.bar;
    typeof f();
```
把 `foo.bar` 存储给 `f` 然后调用，所以 `this` 在 `foo.bar` 引用的是全局对象，所以就没有 `baz` 属性了。换句话说，`foo.bar` 执行的时候上下文是 `foo`，但是当 把 `foo.bar` 赋值给 `f` 的时候，`f` 的上下文环境是 `window` ，是没有 `baz` 的，所以是 ”undefined”。


## 题目八
``` javascript
var f = (function f(){ return "1"; },
    function g(){ return 2; })();
    typeof f;
```
答案：'number'

逗号操作符的使用可以很混淆，但这段说明它的行为:
`var x = (1, 2, 3); x;`
`x`的值是 3 ,这表明，当你有一系列的组合在一起，并由逗号分隔的表达式，它们从左到右进行计算，但只有最后一个表达式的结果保存。由于同样的原因，这个问题可以改写为减少混乱：
``` javascript
var f = (function g(){ return 2; })();
    typeof f;
```
## 题目九
``` javascript
var x = 1;
    if (function f(){}) {
    x += typeof f;
}
    x;
```
答案：'1function'


## 题目十
``` javascript
(function f(){
    function f(){ return 1; }
    return f();
    function f(){ return 2; }
    }
)();
```
答案：2


如果是一直看下来的话，这个题目应该是比较简单。简单的来说在执行 `return` 之前，函数声明会在任何表达式被解析和求值之前先被解析和求值，即使你的声明在代码的最后一行，它也会在同作用域内第一个表达式之前被解析/求值。

参考如下例子，函数 `fn` 是在 `alert` 之后声明的，但是在 `alert` 执行的时候，`fn` 已经有定义了：
``` javascript
 alert(fn());
    function fn() {
    return 'Hello world!';
}
```
所以题目中函数提升了两次，第二次把第一次覆盖了，所以 `return` 后面的 `f` 是 `return` 语句的下一条语句声明的函数 `f` 。注意自执行函数 `(function f (){})()`; 中的 `f` 并没有函数提升效果，它是表达式。


##  题目十一
``` javascript
function f(){ return f; }
new f() instanceof f;
```
答案：`false`

怎样去理解？

`new f()`  首先这个操作会创建一个新对象并调用构造函数函数这一新的对象作为它的当前上下文对象。简单的说就是：

`new f()`;

依稀记得高级程序设计里面是这么说的：

 - 创建空对象。
 
 - 将类的prototype中的属性和方法复制到实例中。

 - 将第一步创建的空对象做为类的参数调用类的构造函数

默认如果没有覆盖这个空对象的话,返回 `this`。
``` javascript
var a = new Object;
a instanceof Object  //为true
```
我们在看 `f()` 返回了 `return f`；那么也就是说这个新的对象是是自身,构造函数本身在 `new` 的过程中会返回一个表示该对象的实例。但是函数的返回值覆盖了这个实例，这个 `new` 就形同虚设。如果 `f` 的形式为 `function f(){return this}` 或`function f(){}`就不一样。
``` javascript
var a = new f();
a instanceof f  // false
```
值得注意的是 `instanceof` 检测的是原型。


## 题目十二
``` javascript
var x = [typeof x, typeof y][1];
typeof typeof x;
```
答案：'undefined'

这题目比较简单，注意下返回类型即可。x = [,][1]；即 `x = typeof y = undefind `。

`typeof` 返回的是 `string` 类型就可以了 ，`typeof typeof` 必然就是`string` 了。



## 题目十三
``` javascript
(function(foo){
    return typeof foo.bar;
})({ foo: { bar: 1 } });
```
### 答案：'undefined'

先分解一下：

``` javascript
var baz = { foo: { bar: 1 } };
(function(foo){
    return typeof foo.bar;
})(baz);
```
去掉函数关联：

``` javascript
var baz = { foo: { bar: 1 } };
var foo = baz;
typeof foo.bar;
```
最后，通过替代我们除去中间变量foo：
``` javascript
var baz = { foo: { bar: 1 } };
typeof baz.bar;
```