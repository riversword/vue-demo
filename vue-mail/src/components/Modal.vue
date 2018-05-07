<template>
<div>
  <div class="md-modal modal-msg md-modal-transition" v-bind:class="{'md-show': mdShow}">
    <div class="md-modal-inner">
      <div class="md-top">
        <button v-on:click="closeModal" class="md-close">Close</button> <!-- v-on:click="mdShow = false" -->
      </div> 
      <div class="md-content">
        <div class="confirm-tips">
            <slot name="message"></slot>
        </div> 
        <div class="btn-wrap">
            <slot name="btnGroup"></slot>
        </div>
      </div>
    </div>
  </div>
  <div class="md-overlay" v-show="mdShow" v-on:click="closeModal">
  </div> <!-- v-on:click="mdShow = false" -->

</div>
</template>
<style></style>
<script>
export default{
    props: ["mdShow"], //接收从父组件传递过来的属性
    data() {
        return {
            msg: 'hello vue'
        }
    },
    methods: {
        closeModal() {
            this.$emit("close"); //触发父组件的close事件
            
        }
    }
}
</script>