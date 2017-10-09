``` javascript
var pubsub = function(){
  var events = {};
  return {
    // 订阅
    subscribe: function(event, listener){
      events[event] = events[event] || [];
      events[event].push(listener) - 1;
    },
    // 发布
    publish: function(event, info){
      events[event].forEach(function(item){
        item(info != undefined ? info : {});
      });
    }
  };
}
```