var addressData = {
  "status":0,
  "message":"",
  "result":[
    {
      "addressId":"100001",
      "userName":"riversword",
      "streetName":"北京市朝阳区朝阳公园1",
      "postCode":"100001",
      "tel":"12345678901",
      "isDefault":true
    },
    {
      "addressId":"100002",
      "userName":"riversword",
      "streetName":"北京市朝阳区朝阳公园2",
      "postCode":"100001",
      "tel":"12345678901",
      "isDefault":false
    },
    {
      "addressId":"100003",
      "userName":"riversword",
      "streetName":"北京市朝阳区朝阳公园3",
      "postCode":"100001",
      "tel":"12345678901",
      "isDefault":false
    },
    {
      "addressId":"100004",
      "userName":"riversword",
      "streetName":"北京市朝阳区朝阳公园4",
      "postCode":"100001",
      "tel":"12345678901",
      "isDefault":false
    },
    {
      "addressId":"100005",
      "userName":"riversword",
      "streetName":"北京市朝阳区朝阳公园5",
      "postCode":"100001",
      "tel":"12345678901",
      "isDefault":false
    }
  ]
};

new Vue({
    el: ".container",
    data: {
        addressList: [],
        limitNum: 3,
        currentIndex: 0,
        deliverWay: 1
    },
    mounted: function () {
        //var that = this; this指向问题
        this.$nextTick(function () {
            this.getAddressList();
        });//实例插入文档后执行
    },
    computed: {
        filterAddress: function () {
            return this.addressList.slice(0, this.limitNum);
            //slice不改变原数组，splice会改变原数组
        }
    },
    methods: {
        getAddressList: function () {
            this.addressList = addressData["result"];
        },
        setDefault: function (id) {
          this.addressList.forEach(function (item, index) {
            if (id == item.addressId) {
              item.isDefault = true;
            } else {
              item.isDefault = false;
            }
          });
        }
    }
});