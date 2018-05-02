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


var vm = new Vue({
    //title: "hello",
    el: "#app",
    data: {
        totalMoney: 0,
        productList: []
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
            this.productList = cartData["result"]["list"];
            this.totalMoney = cartData["result"]['totalMoney']

            //跨域报错，改用变量来模拟数据
            //this指向vue实例vm，引入vue-resource.js插件后，Vue中有了一个$http方法
            /*this.$http.get("data/cartData.json", {"id": 123}).then(function(res) {//then里面即为回调函数，res为拿到的结果

            }); */
        }
    }
});

//Vue.filter(); //定义全局的过滤器


