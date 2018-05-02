### Vue购物车

这是一个练习vue基础知识的案例。



#### 实例声明

```js
var vm = new Vue({
    el: "#app",
    data: {
        title: "hello"
    },

    //定义局部的过滤器
    filters: {

    },

    //实例创建完成后执行
    mounted: function() {
        this.cartView();
        //this.$nextTick(this.cartView()); //实例被插入文档时执行
        
    },
    methods: {
        cartView: function() {
            //this.title = "Vue Hello"; 注意不需要取到data属性就可以拿到里面的title属性
        }
    }
});

//Vue.filter(); //定义全局的过滤器
```

- `el`绑定的dom元素；

- `data`绑定数据；

- `filter`过滤器 在实例内声明的为局部过滤器，在实例外声明的为全局过滤器；

- `mounted`实例创建完毕后执行的内容，“`el` 被新创建的 `vm.$el` 替换，并挂载到实例上去之后调用该钩子”

  ，`this.$nextTick( function() {} )`实例被插入到文档时执行；

- 实例中`this`的指向该实例本身；

- 实例内引入数据、方法，直接`this.属性名`、`this.方法名`，**不需要链式.data或.methods**；

  ​

#### 内容绑定

```html
<p v-text="title"></p>
<p>{{title}}</p>	<!--插入普通文本，两者效果一样-->

<p v-html="rawHtml"></p> <!--插入html-->
```

- `v-text`、`v-html`绑定数据不需要大括号；

  ​

#### 属性绑定

```html
<img v-bind:src="item.productImage">

<li	v-bind:class="{'check': item.checked}"></li> 
<li v-bind:class="{check: item.checked}"></li>
<li v-bind:class="[error, active]"></li>
```

- `v-bind:属性名="绑定内容"`或者简写为`::属性名="绑定内容"`，注意**元素自身属性，不需要加大括号**；

- class绑定的几种方式，绑定的class与原有的class宜分开写；

  ​

#### 列表渲染

```html
<ul v-for="(item,index) in productList">
    <li>
    	<ul>
            <li v-for="part in item.parts" v-text="part.partsName"></li>
        </ul>
    </li>
</ul>
```

- 索引值
- 嵌套列表



#### 过滤器

```html
<div>{{item.productPrice | formatMoney}}</div>
<!--item.productPrice会当作参数传入formatMoney函数-->
```

```js
new Vue({
	filters: {
      formatMoney: function(value) {//value 调用时传入的值
        return "￥ " + value.toFixed(2);
      }
    },
});
```

- 调用格式，|前的值会被当作参数传入



#### 计算属性computed

```html
<li v-for="(item, index) in filterAddress"></li>
```

```js
new Vue({
computed: {
        filterAddress: function () {
            return this.addressList.slice(0, this.limitNum);
        }
    },
});
```



#### 双向绑定v-model

```html
<input type="text" value="0" v-model="item.productQuantity">
```

- 双向绑定，html中的数据也会传递到js中。用于表单控件；



#### 实用方法

```html
<v-bind:class="{'check': index == currentIndex}" v-on:click="currentIndex = index"></li>
```





