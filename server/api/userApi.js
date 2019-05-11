var models = require('../db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sqlMap');

// 连接数据库
var conn = mysql.createConnection(models.mysql);

conn.connect();
var jsonWrite = function(res, ret) {
    if(typeof ret === 'undefined') {
        res.json({
            code: '1',
            msg: '操作失败'
        });
    } else {
        res.json(ret);
    }
};

//获取所有名片模板
router.get('/getMods',(req,res)=>{
    var sql = $sql.namecard.getMods;
    conn.query(sql,[],function(err,result){
        if(err){
            console.log(err)
        }
        if(result){
            res.jsonp(result)
        }
    })
})

//修改名片数据
router.post('/updateMod',(req,res)=>{
    var sql = $sql.namecard.updateMod;
    let para = req.body.content;
    console.log(para)
    conn.query(sql,[para.modaddr,para.modstyle,Number(para.modid)],function(err,result){
        if(err){
            console.log(err)
        }
        if(result){
            res.jsonp(result)
            console.log('以上是修改数据返回内容')
        }
    })

})

//新增名片数据
router.post('/addMod',(req,res)=>{
    var sql = $sql.namecard.addMod;
    let para = req.body.content;
    conn.query(sql,[para.modaddr,para.modstyle],function(err,result){
        if(err){
            console.log(err)
        }
        if(result){
            console.log(res.jsonp(result))
            console.log('以上是新增数据返回内容')
        }
    })
})

//查询名片数据
router.post('/searchMod',(req,res)=>{
    var sql = $sql.namecard.searchMod;
    let para = req.body.content;
    let searchName = '%'+para.styleName+'%';//前后加百分号在数据库中模糊匹配
    //let searchName = '%'+ para+'%';
    console.log(searchName)
    conn.query(sql,[searchName],function(err,result){
        if(err){
            console.log(err)
        }
        if(result){
            console.log(res.json(result))//不要使用jsonp
            console.log('以上是查询数据返回内容')
        }
    })
})
//企业信息修改
router.post('/changeComInfor',(req,res)=>{
    var sql = $sql.comInfor.changeComInfor;
    var para = req.body.content;
    conn.query(sql,[para.comName,para.comNum,para.comaddr,para.comdescript,para.comid],function(err,result){
        if (err) {
            console.log(err);
        }
        if (result) {
            res.json(result)
        }
    })
})
//获取企业信息
router.post('/getAllComInfor',(req,res)=>{
    var sql = $sql.comInfor.getAllComInfor;
    conn.query(sql,[req.body.param],function(err,result){
        if (err) {
            console.log(err);
        }
        if (result) {
            res.json(result)
        }
    })
})

// 增加用户接口
router.post('/addUser', (req, res) => {
    var sql = $sql.user.add;
    var params = req.body;
    console.log(params);
    conn.query(sql, [params.username, params.age], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

module.exports = router;