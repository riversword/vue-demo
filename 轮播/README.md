- 这是一个入门vue的小demo——轮播图，用于学习vue基础知识。

### Vue基础知识

**v-bind** 缩写**:** ，用于DOM属性、class、style绑定，如：

```html
<img v-bind:src="item">

<li class="btn" v-bind:class="{'active-btn': index == mark}"></li>
```



**v-on** 缩写**@** ，用于事件绑定，如

```html
<span v-on:click="next">></span>

<li v-for="(item,index) in images" v-on:click="btn_to(index)"></li>

<div id="banner" v-on="{ mouseenter: stop_play, mouseleave: play}"></div> <!-绑定多个事件-->
```



**v-show** 根据表达式真假值，显示或隐藏元素；**v-if** 根据表达式真假值，渲染元素；

```html
<li v-for="(item,index) in images" v-bind:key="index" v-show="index==mark"><img v-bind:src="item"></li>
```



属性、事件绑定 用单括号{}，标签里面的内容绑定用双括号{{}}

```html
<span>{{message}}</span>
```



`<transition>`用于单个元素过渡效果；`<transition-group>`用于多个元素过渡效果，tag属性。



**Vue实例化**，在实例中：用this.mark，即可获取到data中的mark的值；this.play即获取到methods中名为play的方法；`created` 定义的方法会在实例创建完成时立即执行。

```
var app = new Vue({
        el:'#banner',
        data: {
            images:[
                'image/a1.png',
                'image/a2.png',
                'image/a3.png',
                'image/a4.png'
            ],
            mark:0
        },
        methods:{
            next: function(){
                if( this.mark < 3 ){
                    this.mark++;
                } else {
                    this.mark = 0;
                }
            },
            prev: function(){
                if( this.mark > 0 ){
                    this.mark--;
                } else {
                    this.mark = 3;
                }
            },
            btn_to: function(id){
                this.mark = id;
            },
            play: function(){
                this.timer = setInterval(this.play_method, 2000);
            },
            play_method: function(){

                if( this.mark < 3){ 
                    this.mark++;
                }else{
                    this.mark = 0;
                }
                
            },
            stop_play: function(){
                clearInterval( this.timer );
                this.timer = null;
            }
        },
        created: function () {    //实例创建完 即执行
            this.play();
        } 
    });
```

