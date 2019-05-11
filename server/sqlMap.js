// sql语句
var sqlMap = {
    // 用户
    user: {
        add: 'insert into user(id, name, age) values (0, ?, ?)'
    },
    //名片数据库查询
    namecard :{
        getMods: 'select modid, modaddr, modstyle from namecard.mods',
        updateMod: 'update namecard.mods set modaddr = ?, modstyle = ? where modid = ?',
        addMod: 'insert into namecard.mods (modaddr,modstyle) VALUES (?,?)',
        searchMod: 'select modid,modaddr,modstyle from namecard.mods where modstyle like ?'
    },
    //员工数据库查询
    comemployee:{
        getAllemployee:'select * from namecard.comemployee Limit ?,?',
        getTotalEmployee:'select * from namecard.comemployee',
        updateEmployee: 'update namecard.comemployee set eName = ?, eAge = ?, eSex = ?, eDepartment = ?, ePosition = ? where eid = ?',
        addEmployee: 'insert into namecard.comemployee (eName,eAge,eSex,eDepartment,ePosition) VALUES(?,?,?,?,?)',
        delEmployee: 'delete from namecard.comemployee where eid = ?',
        searchEmployee: 'select * from namecard.comemployee where eName like ? or eAge like ? or eSex like ? or eDepartment like ? or ePosition like ?'
    },
    comInfor:{
        changeComInfor:'update namecard.companyinfor set comName = ?, comNum = ?, comaddr = ?, comdescript = ? where comid = ?',
        getAllComInfor:'select * from namecard.companyinfor where comid = ?'
    },
    users:{
        loginCheck:'select userid,username,comID from namecard.users where username = ? and userpassword = ?'
    },
    files:{
        saveFiles:'insert into namecard.files (userid,fileName,lastTime) values(?,?,?)',
        getAllIntro: 'select fileName as name from namecard.files where userid = ?'
    }
}

module.exports = sqlMap;