``` javascript
// 异步与回调是一枚硬币的正反两面
// 点击之后执行一个动作就是异步回调
// 主函数
document.addEventListener('click', handlerClick, false)
// 回调函数 提取函数
function handlerClick(){ // }
```

<!--单个提取函数是一种方法而已 还有就是模块化 写在立即执行函数里面-->
``` javascript
// module
let handlerModule = (function(){
  return {
    handlerClick: function () {
      //
    }
  }
})()
// 使用
document.addEventListener('click', handlerModule.handlerClick, false)
```
