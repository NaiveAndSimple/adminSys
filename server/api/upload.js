var models = require('../db');
var express = require('express');
var router = express.Router();
var fs = require('fs');
var formidable = require('formidable');
var mysql = require('mysql');
var $sql = require('../sqlMap');

// 连接数据库
var conn = mysql.createConnection(models.mysql);

//保存修改过的文件名
var filename = '';

//接收文件
router.post('/uploadCompanyIntro',(req,res)=>{
    var form = new formidable.IncomingForm();
    form.uploadDir = "./tempUploadFile";//改变临时目录
    form.parse(req, function(error, fields, files){
        for(var key in files){
            var file = files[key];
            var fName = file.name.replace(/\./,'') + (new Date()).getTime().toString();
            filename = fName;
            switch (file.type){
                case "image/jpeg":
                    fName = fName + ".jpg";
                    break;
                case "image/png":
                    fName = fName + ".png";
                    break;
                default :
                    fName =fName + ".png";
                    break;
            }
            console.log(file.size);
            var uploadDir = "./uploadFile/" + fName;
            fs.rename(file.path, uploadDir, function(err) {
                if (err) {
                    res.write(err);
                }
                res.write("upload success");
                res.end();
            });
        }
    });
})
//存储文件信息到数据库
router.post('/saveFileInfor',(req,res)=>{
    let sql = $sql.files.saveFiles;
    var param = req.body.param;
    var nowtime = new Date().toLocaleString();
    conn.query(sql,[param.userid,filename,nowtime],function(err,result){
        if(err){
            console.log(err);
        }
        if(result){
            //console.log(result);
            res.json(result);
        }
    })
})
//获得当前用户对应的所有企业画册
router.post('/getAllIntro',(req,res)=>{
    let sql = $sql.files.getAllIntro;
    let param = req.body.param;
    conn.query(sql,[param.userid],function(err,result){
        if(err){
            console.log(err);
        };
        if(result){
            res.json(result);
        };
    });
})


module.exports = router;