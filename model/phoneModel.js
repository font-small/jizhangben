// 导入 mongoose 模块
const mongoose = require('mongoose');

// 创建结构对象
let phoneSchema = new mongoose.Schema({
    phoneName:String,
    color:String,
    price:Number,
    tags:Array
});

// 创建模型对象
let phoneModel = mongoose.model('huaweis',phoneSchema);

// 暴露 phoneModel
module.exports = phoneModel;
