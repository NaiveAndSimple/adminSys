var models = require('../db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sqlMap');

// 连接数据库
var conn = mysql.createConnection(models.mysql);
conn.connect();

//获取数据库单页员工信息
router.post('/getAllemployee',(req,res)=>{
    var sql = $sql.comemployee.getAllemployee;
    var para = req.body.content;
    var searchPage = (Number(para.page)-1) * para.limit;
    conn.query(sql,[searchPage,para.limit],function(err,result){
        if(err){
            console.log(err)
        }
        if(result){
            res.json(result)
        }
    })
})
//获取员工总数
router.get('/getTotalEmployee',(req,res)=>{
    var sql = $sql.comemployee.getTotalEmployee;
    conn.query(sql,[],function(err,result){
        if(err){
            console.log(err)
        }
        if(result){
            res.json(result)
        }
    })
})
//修改数据库员工信息
router.post('/updateEmployee',(req,res)=>{
    var sql = $sql.comemployee.updateEmployee;
    let para = req.body.content;
    conn.query(sql,[para.eName,para.eAge,para.eSex,para.eDepartment,para.ePosition,para.eid],function(err,result){
        if(err){
            console.log(err)
        }
        if(result){
            res.json(result)
        }
    })
})
//新增数据库员工信息
router.post('/addEmployee',(req,res)=>{
    var sql = $sql.comemployee.addEmployee;
    let para = req.body.content;
    conn.query(sql,[para.eName,para.eAge,para.eSex,para.eDepartment,para.ePosition],function(err,result){
        if(err){
            console.log(err)
        }
        if(result){
            res.json(result)
        }
    })
})
//删除一条员工数据
router.post('/delEmployee',(req,res)=>{
    var sql = $sql.comemployee.delEmployee;
    let para = req.body.content;
    conn.query(sql,[para],function(err,result){
        if(err){
            console.log(err)
        }
        if(result){
            res.json(result)
        }
    })
})
//批量删除数据
router.post('/deleteMany',(req,res)=>{
    let para = req.body.content;
    //因为传过来的参数是 字符串，字符串 这样子的格式，用query传参较为麻烦，所以直接拼接sql语句
    var sql = "delete from namecard.comemployee where eid in (" + para + ")";
    conn.query(sql,function(err,result){
        if(err){
            console.log(err);
        }
        if(result){
            res.json(result);
        }
    })
})
//查询数据
router.post('/searchEmployee',(req,res)=>{
    var sql = $sql.comemployee.searchEmployee;
    let para = req.body.content;
    let searchField = '%'+para.searchField+'%';
    conn.query(sql,[searchField,searchField,searchField,searchField,searchField],function(err,result){
        if(err){
            console.log(err)
        }
        if(result){
            res.json(result)
        }
    })
})

module.exports = router;