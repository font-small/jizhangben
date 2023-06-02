// 导入 mongoose 模块
const mongoose = require('mongoose');

// 创建结构对象
let regSchema = new mongoose.Schema({
    usname:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }
});

// 创建模型对象
let regModel = mongoose.model('regs',regSchema);

// 暴露 phoneModel
module.exports = regModel;