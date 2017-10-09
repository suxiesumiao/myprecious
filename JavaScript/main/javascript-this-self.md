## this
从一道题目开始

```javascript
var name = 'global'
var person = {
  name: 'local',
  sayName: function() {
    console.log(this.name)
  }
}
console.log(this.name) // 1 - 'global'
person.sayName() // 2 - 'local'
var temp = person.sayName
temp() // 3 - 'global'
```
### 解释
 - 1 写在全局里面的 `this` 就是 `window`
 - 2 `this` 存在于某个函数里面谁调用的就是谁 这里是 `person` 在调用 `this` 指代 `person`
 - 3 至于第三个 `temp` 是由 `person.sayName` 赋值过来的 其实就是 `sayName` 这个函数 该函数存在于全局作用域调用的时候其实是 `window.temp()` 所以 `this` 指向的是 `window`
 <img src="./images/JavaScript_this.png" />

 ## `this` 的指向涉及到函数的调用 不同的调用方式得到的 `this` 具体的值也是不一样的

 ### 作为函数调用(普通调用)