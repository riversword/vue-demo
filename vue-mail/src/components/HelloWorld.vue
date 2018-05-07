<template>
  <div class="hello">
        <h1>{{msg}}</h1>
        <!-- <Counter deliverNum="8"></Counter> --> <!--调用组件-->
        <Counter v-bind:deliverNum="parentNum" v-on:incre="increment" v-on:decre="decrement"></Counter> <!--动态传值，加上v-bind-->
        <p>父组件的值{{parentNum}}</p>
    </div>
</template>
<script>
    import Counter from "./Counter.vue"
    export default {
        name: "hello",
        data () {
            return {
                parentNum: 10,
                msg: "welcome to your vue.js app"
            }
        },
        components: {
            Counter
        },
        methods: {
            increment: function () {
                this.parentNum++;
            },
            decrement: function() {
                this.parentNum--;
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
