// 导入 express
const express = require('express');
const moment = require('moment');
// 导入创建对象模型相关代码
const accountModel = require('../../model/accountModule');
// 导入检测登录的中间件
let checkLoginMiddleware = require('../../middlewares/checkLogin');

const router = express.Router();



// 首页
router.get('/',(req,res) => {
  // 这里 先请求/路径
  // 重定向到 account网页中
  // account 网页 发现没登录 会 重定向到 login页面
  //              登录了,account页面
  res.redirect('/account');
});

//记账本的列表
router.get('/account', checkLoginMiddleware,function(req, res, next) {
  
  //获取所有的账单信息
  // let accounts = db.get('accounts').value();
  accountModel.find().sort({time:-1}).exec((err,data) => {
    if(err){
      res.status(500).render('success',{msg: '添加失败~~~', url: '/account'});
      return;
    }
    res.render('list', {accounts: data,moment:moment});
  })
});

//添加记录
router.get('/account/create',checkLoginMiddleware, function(req, res, next) {
  res.render('create');
});

//新增记录
router.post('/account',checkLoginMiddleware, (req, res) => {
  // //生成 id
  // let id = shortid.generate();
  // //写入文件
  // db.get('accounts').unshift({id:id, ...req.body}).write();
  accountModel.create({
    ...req.body,
    time:moment(req.body.time).toDate(),
  },(err,data) => {
    if(err){
      res.status(500).render('success',{msg: '添加失败~~~', url: '/account'});
      return;
    }
    // console.log(data);
    //成功提醒
    res.render('success', {msg: '添加成功哦~~~', url: '/account'});
  });
});

//删除记录
router.get('/account/:id', checkLoginMiddleware,(req, res) => {
  //获取 params 的 id 参数
  let id = req.params.id;
  //删除
  // db.get('accounts').remove({id:id}).write();
  accountModel.deleteOne({id:id},(err,data) => {
    if(err){
      res.status(500).render('success',{msg:'删除失败',url:'/account'});
      return;
    }
    //提醒
    res.render('success', {msg: '删除成功~~~', url: '/account'});
  });
});

module.exports = router;
