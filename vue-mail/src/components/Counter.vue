<template>
    <div>
    <button v-on:click="increase">+</button>
    <button v-on:click="decrease">-</button>
    <p> <span>父传递到子组件的值{{deliverNum}}</span> </p>
    <p> <span>子组件值{{num}}</span> </p>
</div>
</template>
<script>
    export default{
        props: ["deliverNum"], //注意此处的deliverNum即父组件传入的deliverNum，要写相同
        data() {
            return {
                num: 0
            }
        },
        methods: {
            increase: function () {
                //this.num++;
                //this.deliverNum++;
                this.$emit("incre");

                ///import("./../es6ExportAndImport.js"); 异步加载文件
            },
            decrease: function () {
                //this.num--;
                //this.deliverNum--;
                this.$emit("decre");
            }
        }
    }
</script>