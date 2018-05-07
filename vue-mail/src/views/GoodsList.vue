<template>
<div>
    <!-- NavHeader w3c规范标签为小写-->
<nav-header></nav-header>
<nav-bread>
    <span>goods</span>
</nav-bread>
<div class="accessory-result-page accessory-page">
  <div class="container">
    <div class="filter-nav">
      <span class="sortby">Sort by:</span>
      <a href="javascript:void(0)" class="default cur">Default</a>
        <a v-on:click="sortGoods" href="javascript:void(0)" class="price">Price 
        <svg v-bind:class="{'sort-up': sortFlag == 1 }" class="icon icon-arrow-short">
          <use xlink:href="#icon-arrow-short">
            <svg id="icon-arrow-short" viewBox="0 0 25 32" width="100%" height="100%"><title>arrow-short</title> <path d="M24.487 18.922l-1.948-1.948-8.904 8.904v-25.878h-2.783v25.878l-8.904-8.904-1.948 1.948 12.243 12.243z" class="path1"></path></svg>
          </use>
        </svg>
      </a>
      <a href="javascript:void(0)" class="filterby stopPop" v-on:click="showFilterPop">Filter by</a>
    </div>
    <div class="accessory-result">
      <!-- filter -->
      <div class="filter stopPop" id="filter" v-bind:class="{'filterby-show': filterBy}">
        <dl class="filter-price">
          <dt>Price:</dt>
          <dd><a href="javascript:void(0)" v-bind:class="{'cur': priceChecked == 'all'}" v-on:click="setPriceFilter('all')">All</a></dd>
          <dd v-for="(price, index) in priceFilter"  v-on:click="setPriceFilter(index)"><!-- 此处的列表渲染，会渲染出多个dd元素 -->
            <a href="javascript:void(0)" v-bind:class="{'cur': priceChecked == index}">{{price.startPrice}} - {{price.endPrice}}</a>
          </dd>
        </dl>
      </div>

      <!-- search result accessories list -->
      <div class="accessory-list-wrap">
        <div class="accessory-list col-4">
          <ul>
            <li v-for="(item, index) in goodsList">
              <div class="pic">
                <a href="#"><img v-lazy="'/static/'+item.productImage" alt="">{{item.productImage}}</a>
              </div>
              <div class="main">
                <div class="name">{{item.productName}}</div>
                <div class="price">{{item.salePrice}}</div>
                <div class="btn-area">
                  <a v-on:click="addCart(item.productId)" href="javascript:;" class="btn btn--m">加入购物车</a>
                </div>
              </div>
            </li>
          </ul>
          <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30">
            <img v-show="loading" src="./../assets/loading-spinning-bubbles.svg">
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<div class="md-overlay " v-show="overLayFlag" @click="closePop"></div>
<modal v-bind:mdShow="mdShow" v-on:close="closeModal"> <!-- mdShow属性传递到子组件 子组件触发closeModal事件 -->
  <p slot="message">亲，请先登录，否则无法加入购物车</p>
  <div slot="btnGroup">
    <a v-on:click="mdShow = false" href="javascript:;" class="btn btn-m">关闭</a>
  </div> <!--父组件定义的插槽slot元素，绑定事件时不需要父子同信，在父组件里面定义事件处理函数就可以了-->

</modal>

<modal v-bind:mdShow="mdShowCart" v-on:close="closeModal">
  <p slot="message">
    <svg class="icon-status-ok">
      <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-status-ok"></use>
    </svg>
    加入购物车成功
  </p>
  <div slot="btnGroup">
    <a v-on:click="mdShowCart = false" href="javascript:;" class="btn btn-m">继续购物</a>
    <router-link href="javascript:;" class="btn btn-m" to="/cart">查看购物车</router-link>
  </div> 
</modal>

<nav-footer></nav-footer>
</div>
</template>
<style>
.icon-arrow-short{
  transition: all .3s ease-out;
}
.sort-up{
  transform: rotate(180deg);
  transition: all .3s ease-out;
}
.btn:hover{
  background-color: #ee7a23;
  color: white;
  transition: all .3s ease-out;
}
</style>
<script>
    import "./../assets/css/base.css"
    import "./../assets/css/product.css"
    import NavHeader from "@/components/NavHeader.vue"  //起名与H5标签不要冲突
    import NavFooter from "@/components/NavFooter.vue"
    import NavBread from "@/components/NavBread.vue"
    import Modal from "./../components/Modal.vue"

    import axios from "axios"

    export default{
        data() { //注意组件的data是一个函数，返回一个object
            return {
                goodsList: [],
                sortFlag: 1, //默认升序
                page: 1,
                pageSize: 6,
                busy: true, //默认infiniteScroll失效
                loading: true,
                mdShow: false, //模态框
                mdShowCart: false, //成功加入购物车模态框
                priceFilter: [
                {
                    startPrice: '0.00',
                    endPrice: '100.00'
                },
                {
                    startPrice: '100.00',
                    endPrice: '500.00'
                },
                {
                    startPrice: '500.00',
                    endPrice: '1000.00'
                },
                {
                    startPrice: '1000.00',
                    endPrice: '5000.00'
                },
                ],
                priceChecked: 'all',
                filterBy: false,
                overLayFlag: false //遮罩层


            }
        },
        components: { //组件标签，大写变小写，驼峰变-
            NavHeader,
            NavFooter,
            NavBread,
            Modal  //key与value相同时可以直接写；key与value不同时，要写成Modal: ModalValue
        },
        mounted: function () {
            this.$nextTick(this.getGoodsList()); //实例被插入文档时执行
        },
        methods: {
            getGoodsList(flag) {//flag参数识别是否为滚动累计数据
                var param = {
                  page: this.page,
                  pageSize: this.pageSize,
                  sort: this.sortFlag,
                  priceLevel: this.priceChecked
                };
                axios.get("/goods/list", {params: param}).then((result)=>{
                    var res = result.data;
                    if (res.status == "0") {
                      if (flag) {//为滚动加载则将数据拼接
                        this.goodsList = this.goodsList.concat(res.result.list);
                        console.log(res.result.count);
                        if (res.result.count < this.pageSize) {//当前请求已没有数据时（到了尽头），禁止滚动加载
                          this.busy = true;
                          this.loading = false;
                        } else {
                          this.busy = false;
                        }
                      } else {//为普通加载则仅显示一页的数据
                        this.goodsList = res.result.list;
                        this.busy = false;//启用滚动加载
                      }
                    } else {
                      this.goodsList = [];
                      this.loading = false;
                    }
                     
                    //函数被执行了，才会进行赋值
                });
            },
            sortGoods() {
              this.sortFlag = (-1) * this.sortFlag;
              this.page = 1;

              this.loadingText = true;
              this.getGoodsList();
            },
            loadMore() {
              this.busy = true;//禁止滚动加载
              
              //第一个请求结束后，才会请求第二个，避免一次滚动 请求无数次
              setTimeout(() => {
                this.page++;
                this.getGoodsList(true);
              }, 500);
            },
            showFilterPop() {
              this.filterBy = true;
              this.overLayFlag = true;
            },
            closePop() {
              this.filterBy = false;
              this.overLayFlag = false;
            },
            setPriceFilter(index) {
              this.priceChecked = index;

              this.loading = true;

              this.page = 1;//从第一页开始
              this.getGoodsList();

              this.closePop(this.priceChecked);
            },

            addCart(productId) {
              axios.post("goods/addCart", {
                productId: productId
              }).then((response)=>{
                //console.log("res.status",res.status);
                //console.log("res",res);
                var res = response.data;
                if (res.status == "0") {
                  //alert("加入成功");
                  this.mdShowCart = true;
                } else {
                  // alert("msg:" + res.msg);
                  this.mdShow = true;
                }
              });
            },

            closeModal() {
              this.mdShow = false;
              this.mdShowCart = false;
            }
        },
    }
</script>