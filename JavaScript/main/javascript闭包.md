## 闭包
  - 闭包是指有权访问另一个函数作用域中的变量的函数
  - javascript 里面的闭包是跟变量作用域息息相关的
  - 下面的例子之中 boo 就是一个闭包 boo 能访问 foo 函数作用域里面的 a 变量

``` javascript
function foo(){
  let a = 1, b = 2;
  function boo() {
    console.log(a * 10)
  }
// console.dir 能打印出当前对象的属性 并通过类似文件树样式的交互列表显示
  console.dir(boo);
}
foo() // [[Scope]]
```
## [[Scope]]
  - 找到 [[Scope]] scope 就是作用域的意思
  - 有了这个作用域我们就能知道在当前域下能调用哪些变量或者方法
  - scope 有两种 一种是全局作用域 叫做 Global 下面的值有很多了 比如
  - window Math Date
  - 另外一种是 closure 就是我们说的闭包了 所以闭包是一个作用域的概念
  - closure 里面有个值 a 处于 closure
  - 之所以没有 b 是因为我们返回的函数里面没有涉及 b 其实 b 已经被销毁了
-->
``` javascript
for(var i = 0; i < 5; i++){
  setTimeout(function(){
    console.log(i)
  }, 1000 * i)
}
// 理想状态是每隔一秒依次打印出 0 1 2 3 4；
// 但是打印结果是 5 次 5 打印 5 次很好理解 但是打印出的全是 5 令人费解
// 原因: i 是 5 是循环结束的条件 setTimeout 里面的函数每次引用的是结束之后的 i
// 那么如何让 i 保留下来呢
// 可以用闭包 给 setTimeout 加一层函数
```
``` javascript
for(var i = 0; i < 5; i++){
  (function(i){
    setTimeout(function(){
      console.log(i)
    }, 1000 * i)
  })(i)
}
// 立即执行函数相当于外层函数 里面的匿名函数相当于内层函数 因为闭包的存在
// 内层函数能访问到立即执行函数携带的参数 i
```
``` javascript
for(var i = 0; i < 5; i++){
  (function(i){
    setTimeout(function(){
      //注释
      console.dir(function(){
        console.log(i)
      })
      //注释
      console.log(i)
    }, 1000 * i)
  })(i)
}
// 上面注释之间的代码清晰展示了闭包的存在 在 [[Scope]] 里面会有每次函数调用时候
// i 的引用
```
## DOM 相关的
``` html
<ul>
  <li>Apple</li>
  <li>Bpple</li>
  <li>Cpple</li>
  <li>Dpple</li>
  <li>Epple</li>
</ul>
```

``` javascript
var lis = document.getElementsByTagName('li');
for(var i = 0; i < lis.length; i++){
  lis[i].onclick = function(){
    alert(i)
  }
}
```


