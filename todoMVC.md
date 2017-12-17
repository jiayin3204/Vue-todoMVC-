# 		todoMVC案例详解

## 需求说明

- 数据列表展示

  + 将数据循环在 `li` 上 （v-for）

- 添加任务

  + 按下`enter` 保存数据 `@keydown.enter`

    > 非空校验

    > 添加并清空文本框

  + 自动获取焦点

    > 自定义指令

- 任务项

  - 样式联动

    >1）通过计算属性的 get 方法获取到按钮的 checked 
    >
    >2）通过计算属性的 set 方法调用属性获取到 checked 后取反并给 todos 数组的 complete 赋值

  - 删除任务项

    >在HTML中的点击事件中的方法中传入索引作为参数
    >
    >```
    >this.todos.splice(index,1)   // 调用数组的splice方法删除元素
    >```

  - 双击 `label` 进入编辑模式

    > 1）进入编辑模式需要切换类样式，那么 Vue 中的类样式的绑定类名后需要布尔值判断
    >
    > 2）在 Vue 配置项 data 中定义 current = null，当双击事件触发的时候 current = item（item是HTML中传入的循环数组中的元素）
    >
    > 3）类样式的判断条件变为 current === item 即可

- 编辑任务项

  - 获取焦点

    > 在双击label的时候才要获取焦点，所以自定义指令中用update

  - 敲回车或失焦保存编辑

    > 文本框中没有内容就直接删除
    >
    > 改变 todos 中的 title （非空校验）
    >
    > 去除编辑样式

  - 按下 Esc 不保存编辑 

- 显示所有未完成任务数

- 清除所有已完成任务

- 将数据持久化保存到 localStorage

  > localStorage 中必须存入json格式的字符串
  >
  > 获取到的也是字符串，必须转成对象才能使用

- 路由转换（切换active、completed、all）

  - 根据锚点（hash）切换不同的数组筛选

  - 在Vue 的配置 date 中加入filterText = ‘all' 然后再属性中进行判断

    ```
    // onhashchange 事件是在锚点改变的时候才会触发的，所以再刚进入页面的时候并不能保存上一次的锚点
    winb9ow.onhashchange = function () {
      app.filterText = window.hash.substr(2);
    }
    window。onhashchange()    // 所以在页面加载的时候就调用函数一次
    ```

    ​