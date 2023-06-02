var express = require('express');
const moment = require('moment');
var router = express.Router();
const md5 = require('md5');

// 导入创建对象模型相关代码
const userModel = require('../../model/userModule');

// 注册
router.get('/reg', (req, res) => {
    res.render('auth/reg');
});

router.post('/reg', (req, res) => {
    // console.log(req.body);
    userModel.create({ ...req.body, password: md5(req.body.password) }, (err, data) => {
        if (err) {
            res.status(500).send('注册失败,请稍后重试');
            return;
        }
        res.render('success', { msg: '注册成功', url: '/login' });
    })
});

// 登录
router.get('/login', (req, res) => {
    res.render('auth/login');
});
router.post('/login', (req, res) => {
    // 验证用户名密码
    let { usname, password } = req.body;
    userModel.findOne({ usname: usname, password: md5(password) }, (err, data) => {
        if (err) {
            res.status(500).send('登录,请稍后重试');
            return;
        }
        // 如果 用户名密码对,data就不为null;如果不对,data为null;
        // console.log(data);
        /* 登录成功：data
        {
        _id: new ObjectId("64786329f8b8ccba8dd7a524"),
        usname: 'admin',
        password: '21232f297a57a5a743894a0e4a801fc3',
        __v: 0
        }
        */
        /* 登录失败：data
         null
         */
        if (!data) {
            return res.send('用户名或密码有误');
        }
        // 登录成功
        //     写入session (语雀session图示)
        req.session.usname = data.usname;
        req.session._id = data._id;

        res.render('success', { msg: '登录成功', url: '/account' });
    });
});

// 退出登录
router.post('/logout',(req,res) => {
    // 销毁session
    req.session.destroy(() => {
        res.render('success',{ msg: '退出成功', url: '/login' })
    })
})

module.exports = router;
