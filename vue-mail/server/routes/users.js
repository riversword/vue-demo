var express = require('express');
var router = express.Router();

var User = require('./../models/user.js');
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

//查询当前用户的购物车数据
router.get("cartList", function (req, res, next) {
    var userId = req.cookies.userId; //从请求中拿cookie ，res.cookie是往服务器写入cookie
    User.findOne({userId: userId}, function (err, doc) {
        if (err) {
            res.json({
                status: "1",
                msg: err.message
                result: ''
            });
        } else {
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

module.exports = router;
