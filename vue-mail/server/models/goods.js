//common规范 node.js 浏览器支持
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//定义一个模型
var productSchema = new Schema({
    "productId": String, //{type: String}
    "productName" : String,
    "salePrice" : Number,
    "productImage" : String,

    "checked": String, //若不加这两个属性，无法附加属性
    "productNum": String
});

module.exports = mongoose.model('Good', productSchema);
//注意Good没有s， mongoose.model('Good', productSchema); 填'Good' 会自动关联数据库中的goods
//或者写成如下形式
//module.exports = mongoose.model('Good', productSchema, 'goods');