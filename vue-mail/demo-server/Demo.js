let user = require("./User");

console.log("userName",user.userName);
console.log("sayHello", user.sayHello());

let http = require('http');
let url = require('url');
let util = require('util');

let server = http.createServer((req, res)=>{
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    
    //res.end("hello, node.js");

    //util.inspect(url.parse(req.url)); //将对象转换成字符串输出
    console.log("url",req.url); //字符串
    console.log("parse",url.parse(req.url)); //对象
    console.log("inspect",util.inspect(url.parse(req.url)));

    res.end(util.inspect(url.parse(req.url)));
 });

 server.listen(3000, '127.0.0.1', ()=>{
    console.log("服务器已经运行，请打开浏览器输入http://127.0.0.1:3000/来进行访问");
 });