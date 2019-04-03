function broadcast(componentName, eventName, params) {
  //父子组件通信，将参数从父组件传递给子组件
  //$emit:触发器，触发定义的事件，并传递一些参数给监听器的回调
  //$on:监听器，监听定义的事件，回调函数接收触发器传递来的参数。
  //数据从$emit->$on传递，也就是父组件->子组件De顺序。
  //broadcast定义在父组件上，可以通过$children拿到所有子组件的节点
  //当子节点name===参数name时，调用$emit(eventName,params),子组件通过$on接收参数
  //如果不相等，则递归往下一个孙子节点
  //如果全部节点都不相等，则报错。
    this.$children.forEach(child => {
      const name = child.$options.name;
  
      if (name === componentName) {
        child.$emit.apply(child, [eventName].concat(params));
        //等价于child.$emit(eventName,params)
      } else {
        broadcast.apply(child, [componentName, eventName].concat([params]));
      }
    });
  }



  export default {
    methods: {
      dispatch(componentName, eventName, params) {
        let parent = this.$parent || this.$root;
        let name = parent.$options.name;
  
        while (parent && (!name || name !== componentName)) {
          parent = parent.$parent;
  
          if (parent) {
            name = parent.$options.name;
          }
        }
        if (parent) {
          parent.$emit.apply(parent, [eventName].concat(params));
        }
      },
      broadcast(componentName, eventName, params) {
        broadcast.call(this, componentName, eventName, params);
      }
    }
  };


