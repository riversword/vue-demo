var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Goods = require('../models/goods');

//连接mongodb数据库
mongoose.connect('mongodb://127.0.0.1:27017/vuemail');

mongoose.connection.on("connected", function () {
    console.log("MongoDB connected success.");
});

mongoose.connection.on("error", function () {
    console.log("MongoDB connected fail.");
});

mongoose.connection.on("disconnected", function () {
    console.log("MongoDB disconnected.");
});

//查询商品列表
router.get("/list", function (req, res, next) {
    //res.send('hello, goods'); 测试成功
    //获取到浏览器的请求参数 如req.url
    let page = parseInt(req.param("page"));
    let pageSize = parseInt(req.param("pageSize"));
    let sort = req.param("sort");//req.param()获取到传入的参数
    let priceLevel = req.param("priceLevel");
    let skip = (page - 1) * pageSize; //page当前页码，skip可当作索引
    
    var priceGt = "", priceLte = "";
    let params = {};
    if (priceLevel != "all") {
        switch (priceLevel) {
            case "0": 
                priceGt = 0, priceLte = 100;
                break;
            case "1": 
                priceGt = 100, priceLte = 500;
                break;
            case "2": 
                priceGt = 500, priceLte = 1000;
                break;
            case "3": 
                priceGt = 1000, priceLte = 5000;
                break;
        };
        params = {
            salePrice:{
                $gt: priceGt,
                $lte: priceLte
            }
        };
    }
    
    //let params = {}; //筛选条件
    //.find查找数据，.skip跳过数据条数 .limit()中参数要为数字
    let goodsModel = Goods.find(params).skip(skip).limit(pageSize); //.find返回一个模型
    goodsModel.sort({'salePrice': sort}); // sort=1升序，-1降序

    //Goods.find({}, function (err, doc) {
    goodsModel.exec( function (err, doc) {
        if (err) {
            res.json({
                status: '1',
                msg: err.message
            });
        } else {
            res.json({
                status: '0',
                msg: '',
                result: {
                    count: doc.length,
                    list: doc
                }
            });
        }
    });
});

//加入到购物车
router.post("/addCart", function (req, res, next) {
    var userId = "100000077";
    var productId = req.body.productId; //注意post与get取参不一样
    var User = require('../models/user');
    console.log("req.body.productId",req.body.productId);

    User.findOne({userId:userId}, function (err, userDoc) {
        if (err) {
            res.json({
                status: "1",
                msg: err.message,
            });
        } else {
            //console.log("userDoc",userDoc);
            if (userDoc) {
                let goodsItem = '';
                userDoc.cartList.forEach(function (item) {
                    if (item.productId == productId) {
                        goodsItem = item;
                        item.productNum ++;
                        console.log("item.productNum", item.productNum);
                    }
                });

                if (goodsItem) { //若添加已有商品，保存就可以了（上一补已经++了）
                    userDoc.save(function (err2, doc2) {
                        if (err2) {
                                res.json({
                                    status: "102",
                                    msg: err2.message,
                                });
                            } else {
                                res.json({
                                    status: '0',
                                    msg: '',
                                    result: 'suc'
                                });
                            }
                        });
                } else {
                    Goods.findOne({productId: productId}, function (err1, doc) {
                        if (err1) {
                            res.json({
                                status: "101",
                                msg: err1.message,
                            });
                        } else {
                            if (doc) {
                                doc.productNum = 1; //赋值未成功？ doc模型里面未声明的属性不会被添加
                                doc.checked = 1; //赋值未成功？

                                console.log("typeof doc", typeof doc);//object
                                console.log("doc.productNum", doc.productNum);//1
                                console.log("doc.checked", doc.checked);//1
                                console.log("doc.productId", doc.productId);

                                //doc.productId = "test";
                                //console.log("doc.productId", doc.productId);

                                userDoc.cartList.push(doc);
                                console.log("doc", doc);

                                userDoc.save(function (err2, doc2) {
                                    if (err2) {
                                        res.json({
                                            status: "102",
                                            msg: err2.message,
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
                }

    
            }
        }
    });
});

module.exports = router;
