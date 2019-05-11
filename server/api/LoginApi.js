var models = require('../db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sqlMap');

// 连接数据库
var conn = mysql.createConnection(models.mysql);

conn.connect();
//登录功能
router.post('/LoginCheck',(req,res)=>{
    var sql = $sql.users.loginCheck;
    var param = req.body.content;
    console.log(param);
    conn.query(sql,[param.username,param.pwd],function(err,result){
        if(err){
            console.log(err);
        }
        if(result){
            res.json(result);
        }
    })
})

module.exports = router;