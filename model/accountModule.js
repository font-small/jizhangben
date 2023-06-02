// 导入 mongoose 模块
const mongoose = require('mongoose');

// 创建结构对象
let accountSchema = new mongoose.Schema({
    title: {
        type:String,
        required:true
    },
    time:{
        type: Date,
    },
    type: {
        type:Number,
        default:-1
    },
    account: {
        type:Number,
        required:true
    },
    remark:String
});

// 创建模型对象
let accountModel = mongoose.model('accounts',accountSchema);

// 暴露 phoneModel
module.exports = accountModel;