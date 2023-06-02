// 导入 mongoose 模块
const mongoose = require('mongoose');

// 创建结构对象
let bookSchema = new mongoose.Schema({
    name: String,
    author: String,
    price: Number,
    is_hot: Boolean
});

// 创建模型对象
let bookModel = mongoose.model('books',bookSchema);

// 暴露 phoneModel
module.exports = bookModel;