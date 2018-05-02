//商品数据
var cartData = {
  "status":1,
  "result":{
    "totalMoney":109,
    "list":[
      {
        "productId":"600100002115",
        "productName":"黄鹤楼香烟",
        "productPrice":19,
        "productQuantity":1,
        "productImage":"img/goods-1.jpg",
        "parts":[
          {
            "partsId":"10001",
            "partsName":"打火机",
            "imgSrc":"img/part-1.jpg"
          }
        ]
      },
      {
        "productId":"600100002120",
        "productName":"加多宝",
        "productPrice":8,
        "productQuantity":5,
        "productImage":"img/goods-2.jpg",
        "parts":[
          {
            "partsId":"20001",
            "partsName":"吸管",
            "imgSrc":"img/part-2.jpg"
          }
        ]
      },
      {
        "productId":"600100002117",
        "productName":"金装黄鹤楼",
        "productPrice":25,
        "productQuantity":2,
        "productImage":"img/goods-1.jpg",
        "parts":[
          {
            "partsId":"10001",
            "partsName":"打火机-1",
            "imgSrc":"img/part-1.jpg"
          },
          {
            "partsId":"10002",
            "partsName":"打火机-2",
            "imgSrc":"img/part-1.jpg"
          }
        ]
      }
    ]
  },
  "message":""
};


new Vue({
    //title: "hello",
    el: "#app",
    data: {
        totalPrice: 0,
        totalMoney: 0,
        productList: [],
        checkAll: false,
        delFlag: false,
        curProduct: null,
    },

    //定义局部的过滤器
    filters: {
      formatMoney: function(value) {//value调用过滤器传入的值
        return "￥ " + value.toFixed(2);
      }
    },

    //实例创建完成后执行
    mounted: function() {
        //this.cartView();
        this.$nextTick(this.cartView()); //实例被插入文档时执行
        //this指向
        
    },
    methods: {
        cartView: function () {
            //this.title = "Vue Hello"; 注意不需要取到data属性就可以拿到里面的title属性
            this.productList = cartData["result"]["list"];
            this.totalMoney = cartData["result"]['totalMoney']

            //let that = this;
            //跨域报错，改用变量来模拟数据
            //this指向vue实例vm，引入vue-resource.js插件后，Vue中有了一个$http方法
            /*this.$http.get("data/cartData.json", {"id": 123}).then(function(res) {//then里面即为回调函数，res为拿到的结果
              that.productList = res["result"]["list"];
            }); */
            /*
            this.$http.get("data/cartData.json", {"id": 123}).then( res => {//then里面即为回调函数，res为拿到的结果
              this.productList = res["result"]["list"];//用箭头函数 不会存在this指向的问题，函数内this与函数外this相同
            });
            */
        },
        changeMoney: function (product, way) {
          if (way>0) {
            product.productQuantity++;
          } else {
            product.productQuantity--;
            if (product.productQuantity < 1) {
              product.productQuantity = 1;
            }
          }

          this.calcTotalPrice();
        },
        selectProduct: function (product) {
          if (typeof product.checked == "undefined") {
            //Vue.set(product, "checked", true);//全局设置
            this.$set(product, "checked", true);
          } else {
            product.checked = !product.checked;
          }

          this.calcTotalPrice();
        },
        selectAll: function (flag) {
          this.checkAll = flag;
          var that = this;

          this.productList.forEach(function (item, index) {
            //value.checked = true;
            //注意最开始对象checked的属性是不存在的，无法对其赋值
            if (typeof item.checked == "undefined") {//注意判断时 undefined加上了引号
              that.$set(item, "checked", that.checkAll);
            } else {
              item.checked = that.checkAll;
            }

            that.calcTotalPrice();

          });
          
        },
        calcTotalPrice: function () {
          var that = this;
          that.totalPrice = 0;//that.totalPrice的值会影响到下一次的累加，每次执行要初始化
          this.productList.forEach(function (item, index) {
            if (item.checked) {
              that.totalPrice += item.productPrice*item.productQuantity;
            }
          });

          return that.totalPrice; //做成双向绑定

          
        },
        delConfirm: function (product) {
          this.delFlag = true;
          this.curProduct = product;
        },
        delProduct: function () {
          var index = this.productList.indexOf(this.curProduct);
          this.productList.splice(index, 1);
          this.delFlag = false;
        }
    }
});

/*
Vue.filter("gMoney",function(value, type) {
  return "$ " + value.toFixed(2) + type;
}); //定义全局的过滤器
*/

//箭头函数 参数=>{函数体} ，函数作用域指向外部


