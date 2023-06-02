

/**
 * 
 * @param {*} success 数据库连接成功的回调
 * @param {*} error 数据库连接失败的回调
 */
function db(success, error) {
    //判断 error 为其设置默认值
    if (typeof error !== 'function') {
        error = () => {
            console.log('连接失败~~~');
        }
    }
    // 1、导入 mongoose 工具包
    const mongoose = require('mongoose');
    // 2、导入配置文件
    const {DBHOST,DBPORT,DBNAME} = require('../config/config');
    // 设置 strictQuery 为 true
    mongoose.set('strictQuery', true);

    // 2、连接 mongodb 服务                     数据库
    mongoose.connect(`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`);
    // 3、设置回调 
    const db = mongoose.connection;
    // 设置连接成功的回调
    db.once('open', () => {
        // 调用成功函数
        success();
    })

    // 设置连接失败的回调
    db.on('error', () => {
        // 调用失败函数
        error();
    });

    // 设置连接关闭的回调
    db.on('close', () => {
        console.log('连接关闭');
    });
};
// 暴露
module.exports = db;