# **this**

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

## 1 - 作为函数调用(普通调用) `this` 指代 `window`(非严格模式下) 或者 `undefined` (严格模式下)
``` javascript
 // 非严格模式下
var name = 'global';
function foo(){
  var boo = function (){
      console.dir(this.name)
  }
  boo();
};
foo(); // 'global'
 ```

``` javascript
// 严格模式下
'use strict'
var name = 'global';
function foo(){
  var boo = function (){
      console.dir(this.name)
  }
  boo();
};
foo(); // 会报错
 ```
 ## 2 - 作为方法调用(函数属于哪一个对象就称为哪一个对象的方法)
 ## 3 - 由构造函数构造出来的对象
 ``` javascript
 function Person(name, age, say){
   this.name = name;
   this.age = age;
   this.say = function() {
     console.log(this.name)
   }
 }
 var p = new Person('zhu', 12)
 p.say()
 ```

 ## 4 - `apply` `call`
 ``` javascript
 var zhu = {
   name: 'zhu',
   age: 12,
   say: function(name, age) {
     console.log(`${name}是${this.name}-${age}是${this.age}`)
   }
 }

 var zhen = {
   name: 'zhen',
   age: 15,
 }
 zhu.say.apply(zhen, ['姓名', '年龄'])
 zhu.say.call(zhen, '姓名', '年龄')
 zhu.say.apply(zhen, {0: '姓名', 1: '年龄', length: 2});
 ```
## 5 - [bind](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)
### 绑定 `this`
``` javascript
var name = 'global'
var person = {
  name: 'local',
  sayName: function() {
    console.log(this.name)
  }
}
var sayNameNew = person.sayName
var boundedFunc = sayNameNew.bind(person)
boundedFunc() // 'local'
```
<img src="./images/JavaScript_bind_this.png" />

### 绑定参数

``` javascript
function list() {
  return Array.prototype.slice.call(arguments);
}

var list1 = list(1, 2, 3); // [1, 2, 3]

// Create a function with a preset leading argument
var leadingThirtysevenList = list.bind(undefined, 37);

var list2 = leadingThirtysevenList(); // [37]
var list3 = leadingThirtysevenList(1, 2, 3); // [37, 1, 2, 3]
```
<img src="./images/JavaScript_bind_args.png" />

## 箭头函数中的 `this`

#### 箭头函数没有自己的 `this`, 它的 `this` 是继承而来; 默认指向在定义它时,它所处的对象(宿主对象),而不是执行时的对象, 定义它的时候,可能环境是 `window` 即是继承上下文的

详解见 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions#像方法一样使用箭头函数)

### 其他的测试题目

``` javascript
var name = 'window'

var person1 = {
  name: 'person1',
  show1: function () {
    console.log(this.name)
  },
  show2: () => console.log(this.name), // this is window
  show3: function () {
    return function () {
      console.log(this.name)
    }
  },
  show4: function () {
    return () => console.log(this.name) // this is person1
  }
}
var person2 = { name: 'person2' }

person1.show1() // 'person1' 方法是 person1 的方法
person1.show1.call(person2) // 'person2' 方法转化成了 person2 的方法

person1.show2() // 'window' 箭头函数里面的 this 是继承来的 person1 的上文是 window
person1.show2.call(person2)  // 'window' person2 调用了 person1 的函数 同上

person1.show3()() // 'window'
person1.show3().call(person2) // 'person2' person1.show3() 结果是一个函数 该函数被 person2 调用
person1.show3.call(person2)() // 'window' person2 调用的是 person1.show3 这个函数 而不是其返回的结果

person1.show4()() // 'person1' // 此处的 this 穿透了 外层的 function 实际上是 person1
person1.show4().call(person2) // 'person1' person2 调用的是 person1.show4 的执行结果
person1.show4.call(person2)() // 'person2' person2 调用的是 person1.show4 那个函数 而不是执行结果

```
## 混合 `this` 测试
``` javascript
var name = 'window';
var o = {
    name: 'o',
    child_1: {
      name: 'child_1',
      func: function () {
        // 由此处的 this 定义
        return () => { console.log(this.name) }
      }
    },
    child_2: {
      name: 'child_2',
      func: () => {
        // 穿透箭头函数 对象嵌套
        return () => { console.log(this.name) }
      }
    },
    child_3: {
      name: 'child_3',
      func: () => {
        return function () { console.log(this.name) }
      }
    }
}
o.child_1.func()(); // 'child_1'
o.child_2.func()(); // 'window'
o.child_3.func()(); // 'window'
```
## new `this` 测试
``` javascript
var name = 'window'

function Person (name) {
  this.name = name;
  this.show1 = function () {
    console.log(this.name)
  }
  this.show2 = () => console.log(this.name)
  this.show3 = function () {
    return function () {
      console.log(this.name)
    }
  }
  this.show4 = function () {
    return () => console.log(this.name)
  }
}

var personA = new Person('personA')
var personB = new Person('personB')

personA.show1() // 'personA'
personA.show1.call(personB) // 'personB'

personA.show2() // 'perspnA'
personA.show2.call(personB) // 'personA' 

personA.show3()() // 'window'
personA.show3().call(personB) // 'personB'
personA.show3.call(personB)() // 'window'

personA.show4()() // 'personA'
personA.show4().call(personB) // 'personA'
personA.show4.call(personB)() // 'personB'

```