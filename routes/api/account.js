var express = require('express');
const moment = require('moment');
var router = express.Router();

// 导入创建对象模型相关代码
const accountModel = require('../../model/accountModule');


//获取所有的账单信息
router.get('/account', function (req, res, next) {
  // let accounts = db.get('accounts').value();
  accountModel.find().sort({ time: -1 }).exec((err, data) => {
    if (err) {
      res.json({
        code: '1001',
        msg: '读取失败',
        data: null
      });
      return;
    }
    res.json({
      code: '0000',
      msg: '读取成功',
      data: data
    });
  })
});

// 获取单个账单信息
router.get('/account/:id', (req, res) => {
  let { id } = req.params;
  accountModel.findById(id, (err, data) => {
    if (err) {
      res.json({
        code: '1003',
        msg: '读取失败',
        data: null
      });
      return;
    }
    res.json({
      code: '0000',
      msg: '读取成功',
      data: data
    });
  })
});

//新增记录
router.post('/account', (req, res) => {
  // //生成 id
  // let id = shortid.generate();
  // //写入文件
  // db.get('accounts').unshift({id:id, ...req.body}).write();

  // 表单验证
  // console.log(req.body);
  // console.log(typeof)
  if (!req.body.title) {
    res.json({
      code: '10021',
      msg: 'title 为必填项',
      data: null
    });
  } else if (!req.body.account) {
    res.json({
      code: '10023',
      msg: '金额为必填项',
      data: null
    });
  }else if (typeof(req.body.time) != coment) {
    res.json({
      code: '10023',
      msg: '时间格式有误,示例:XXXX-XX-XXTXX:XX:XX.000Z',
      data: null
    });
  } else {
    accountModel.create({
      ...req.body,
      time: moment(req.body.time).toDate(),
    }, (err, data) => {
      if (err) {
        res.json({
          code: '1002',
          msg: '创建失败',
          data: null
        });
        return;
      }
      // console.log(data);
      //成功提醒
      res.json({
        code: '0000',
        msg: '创建账单成功',
        data: data
      })
    });
  }
});


// 更新单个账单信息
// 局部更新 patch
router.patch('/account/:id', (req, res) => {
  let id = req.params.id;
  accountModel.updateOne({ _id: id }, req.body, (err, data) => {
    if (err) {
      res.json({
        code: '1005',
        msg: '更新失败',
        data: null
      });
      return;
    }
    // 再次查询数据库，获取单条数据
    accountModel.findById(id, (err, data) => {
      if (err) {
        res.json({
          code: '1003',
          msg: '读取失败',
          data: null
        });
        return;
      }
      res.json({
        code: '0000',
        msg: '读取成功',
        data: data
      });
    })
  });
})

//删除记录
router.delete('/account/:id', (req, res) => {
  //获取 params 的 id 参数
  let id = req.params.id;
  //删除
  // db.get('accounts').remove({id:id}).write();
  accountModel.deleteOne({ _id: id }, (err, data) => {
    if (err) {
      res.json({
        code: '1004',
        msg: '删除失败',
        data: null
      });
    }
    //提醒
    res.json({
      code: '0000',
      msg: '删除成功',
      data: {}

    });
  });
});

module.exports = router;
