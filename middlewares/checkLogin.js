// 检测登录的中间件
module.exports = (req,res,next) => {
    if(!req.session.usname){
      return res.redirect('/login');
    }
    next();
  }