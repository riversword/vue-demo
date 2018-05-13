var express = require('express');
var router = express.Router();

//var mongoose = require('mongoose'); //测试
require('./../util/util.js');

var User = require('./../models/user.js');


//连接mongodb数据库
// mongoose.connect('mongodb://127.0.0.1:27017/vuemail');//测试
// mongoose.connection.on("connected", function () {//测试
//     console.log("MongoDB connected success. users");
// });//测试


/* GET users listing. */  //配置users开头的二级路由
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post("/login", function (req, res, next) {
    var param = {
        userName: req.body.userName,
        userPwd: req.body.userPwd
    }; //post请求在body中拿参数

    User.findOne(param, function (err, doc) {
        if (err) {
            res.json({
                status: "1",
                msg: err.message
            });
        } else {
            if (doc) {

                //第一个参数cookie的名，第二个参数 值，第三个参数 设置
                res.cookie("userId", doc.userId, {
                    path: '/', //存放到服务器根目录
                    maxAge: 1000*60*60 //周期 ms
                });


                res.cookie("userName", doc.userName, {
                    path: '/', //存放到服务器根目录
                    maxAge: 1000*60*60 //周期 ms
                });


                //存到session要用req，session是客户端发过来的请求
                //req.session.user = doc; //需要安装插件express-session

                res.json({
                    status: "0",
                    msg: "",
                    result: {
                        userName: doc.userName
                    }
                });
            }
        }
    });
});

//登出
router.post("/logout", function (req, res, next) {
    res.cookie("userId", "", { //将cookie的值置空
        path: "/",
        maxAge: -1 //或者0让其失效
    });
    //方法二res clean cookie
    res.json({
        status: "0",
        msg: "",
        result: ""
    });
});

//注意.cookie 与 .cookies

//进入网页即验证用户是否登录过
router.get("/checkLogin", function (req, res, next) {
    if (req.cookies.userId) {
        res.json({
            status: '0',
            msg: '',
            result: req.cookies.userName
        });
    } else {
        res.json({
            status: '1',
            msg: '未登录',
            result: ''
        });
    }
});

//查询当前用户的购物车数量
router.get("/getCartCount", function(req, res, next) {
    if (req.cookies && req.cookies.userId) {
        var userId = req.cookies.userId;
        User.findOne({userId: userId}, function(err, doc) {
            if (err) {
                res.json({
                    status: '1',
                    msg: err.message,
                    result: ''
                });
            } else {
                var cartList = doc.cartList;
                var cartCount = 0;
                cartList.map(function(item) {
                    cartCount += parseInt(item.productNum);
                }); 

                res.json({
                    status: '0',
                    msg: '',
                    result: cartCount
                });
            }
        });
    }
});

//查询当前用户的购物车数据
router.get("/cartList", function (req, res, next) {
    var userId = req.cookies.userId; //从请求中拿cookie ，res.cookie是往服务器写入cookie
    console.log("userId=",userId);
    User.findOne({userId: userId}, function (err, doc) {
        if (err) {
            res.json({
                status: "1",
                msg: err.message,
                result: ''
            });
        } else {
            //console.log("users.js cartList doc=", doc);
            if (doc) {
                res.json({
                    status: '0',
                    msg: '',
                    result: doc.cartList
                });
            }
        }
    });
});

//购物车删除
router.post("/cartDel", function (req, res, next) {
    var userId = req.cookies.userId,
        productId = req.body.productId;
    User.update({
        userId: userId //查询条件
        }, {
            $pull: { //$pull monggose删除语法
                'cartList': {
                    'productId': productId
                }
            }
        }, function (err, doc) {
            if (err) {
                res.json({
                    status: '1',
                    msg: err.message,
                    result: ''
                });
            } else {
                console.log('doc', doc);
                res.json({
                    status: '0',
                    msg: '',
                    result: 'suc'
                });
            }
        }); 
});

//编辑购物商品数量
router.post("/cartEdit", function (req, res, next) {
    var userId = req.cookies.userId,
        productId = req.body.productId,
        productNum = req.body.productNum;
        checked = req.body.checked;
    //mongoose 更新子文档语法
    User.update({"userId": userId, "cartList.productId": productId}, {
        "cartList.$.productNum": productNum,
        "cartList.$.checked": checked,
    }, function (err, doc) {
        if (err) {
            res.json({
                status: '1',
                msg: err.message,
                result: ''
            });
        } else {
            console.log('doc', doc);
            res.json({
                status: '0',
                msg: '',
                result: 'suc'
            });
        }
    });

});

//购物车商品全选/取消去选
router.post("/editCheckAll", function (req, res, next) {
    var userId = req.cookies.userId,
        checkAll = req.body.checkAll ? '1' : '0';
    User.findOne({userId: userId}, function (err, user) {
        if (err) {
            res.json({
                status: '1',
                msg: err.message,
                result: ''
            });
        } else {
            //console.log('doc', doc);
            if (user) { //user即当前用户的json数据对象
                user.cartList.forEach( (item)=>{
                    item.checked = checkAll;
                } ); 
                user.save(function (err1, doc1) {
                    if (err1) {
                        res.json({
                            status: '1',
                            msg: err.message,
                            result: ''
                        });
                    } else {
                        res.json({
                            status: '0',
                            msg: '',
                            result: 'suc'
                        });
                    }
                });
            }
        }
    });
});

//地址列表
router.get("/addressList", function (req, res, next) {
     var userId = req.cookies.userId;
     User.findOne({userId: userId}, function (err, doc) {
        if (err) {
            res.json({
                status: '1',
                msg: err.message,
                result: ''
            });
        } else {
            if (doc) {
                res.json({
                    status: '0',
                    msg: '',
                    result: doc.addressList
                });
            }
        }
     });
});

//设置默认地址
router.post("/setDefault", function(req, res, next) {
    var userId = req.cookies.userId,
        addressId = req.body.addressId;

    if (!addressId) {
        res.json({
            status: '1003',  //1为普通错误
            msg: 'address is null', 
            result: ''
        });
    } else {
        User.findOne({userId: userId}, function (err, doc) {
            if (err) {
                res.json({
                    status: '1',
                    msg: err.message,
                    result: ''
                });
            } else {
                var addressList = doc.addressList;
                addressList.forEach((item)=>{
                    if (item.addressId == addressId) {
                        item.isDefault = true;
                    } else {
                        item.isDefault = false;
                    }
                });
                doc.save(function (err1, doc1) {
                    if (err1) {
                        res.json({
                            status: '1',
                            msg: err.message,
                            result: ''
                        });
                    } else {
                        
                        res.json({
                            status: '0',
                            msg: '',
                            result: ''
                        });
                        
                    }
                });
            }
        });
    }

     
});

//删除地址
router.post("/delAddress", function(req, res, next) {
    var userId = req.cookies.userId,
        addressId = req.body.addressId;
     User.update({
        userId: userId //查询条件
        }, {
            $pull: { //$pull monggose删除语法
                'addressList': {
                    'addressId': addressId
                }
            }
        }, function (err, doc) {
            if (err) {
                res.json({
                    status: '1',
                    msg: err.message,//mongodb数据库的错误信息
                    result: ''
                });
            } else {
                console.log('doc', doc);
                res.json({
                    status: '0',
                    msg: '',
                    result: 'suc'
                });
            }
        });
});

//订单
router.post("/payMent", function (req, res, next) {
    var userId = req.cookies.userId,
        addressId = req.body.addressId,
        orderTotal = req.body.orderTotal;
        User.findOne({userId: userId}, function(err, doc) {
            if (err) {
                res.json({
                    status: '1',
                    msg: err.message,
                    result: ''
                });
            } else {
                var address = null,
                    payList = [];
                console.log("addressId=",addressId);
                //获取当前用户地址信息
                doc.addressList.forEach((item)=>{
                    if (addressId == item.addressId) {
                        address = item;
                    }
                });
                //获取用户购物车商品
                doc.cartList.forEach((item)=>{
                    if (item.checked == '1') {
                        payList.push(item);
                    }
                });

                var plateform = '622';
                var r1 = Math.floor(Math.random() * 10);
                var r2 = Math.floor(Math.random() * 10);

                var sysDate = new Date().Format('yyyyMMddhhmmss');
                var createDate = new Date().Format('yyyyMMddhhmmss');
                var orderId = plateform + r1 + sysDate + r2;

                var order = {
                    orderId: orderId,
                    orderTotal: orderTotal,
                    addressInfo: address,
                    goodsList: payList,
                    orderStatus: '1',
                    createDate: createDate
                };

                doc.orderList.push(order);

                doc.save(function(err1, doc1) {
                    if (err1) {
                        res.json({
                            status: '1',
                            msg: err.message,
                            result: ''
                        });
                    } else {
                        res.json({
                            status: '0',
                            msg: '',
                            result: {
                                orderId: order.orderId,
                                orderTotal: order.orderTotal
                            }
                        });
                    }
                })
            }
        });
});

//根据orderId查询订单详情
router.get("/orderDetail", function (req, res, next) {
    var userId = req.cookies.userId,
        orderId = req.param("orderId");
    User.findOne({userId: userId}, function (err, userInfo) {
        if (err) {
            res.json({
                status: '1',
                msg: err.message,
                result: ''
            });
        } else {
            var orderList = userInfo.orderList;
            if (orderList.length>0) {
                var orderTotal;
                orderList.forEach((item)=>{
                    if(item.orderId == orderId) {
                        orderTotal = item.orderTotal;
                    }
                });

                if (orderTotal>0) {
                    res.json({
                        status: '0',
                        msg: '',
                        result: {
                            orderId: orderId,
                            orderTotal: orderTotal
                        }
                    });
                } else {
                    res.json({
                        status: '120002',
                        msg: 'there is no order , orderTotal <= 0',
                        result: ''
                    });
                }
                
            } else {
                res.json({
                    status: '120001',
                    msg: 'the user has no order',
                    result: ''
                });
            }
        }
    });
});

module.exports = router;
