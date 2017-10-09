### 函数是一等公民(平等)
  函数可以作为参数像其他的数据类型一样被传递
  ``` javascript
  document.addEventListener('click', function() {}, false)
  ```
### 高阶函数
  可以返回函数的函数
  ``` javascript
  function foo(){
    let pre = 1, bac = 2;
    return function () {
      return pre + bac;
    }
  }
  let res = foo();
  res(); // 3
  ```