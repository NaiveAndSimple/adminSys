<template>
  <el-row>
    <el-col :span="24">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path:'/dashboard' }">首页</el-breadcrumb-item>
        </el-breadcrumb>
    </el-col>
    <el-col :span="12" :offset="8" class="comName">{{companyInfor.comName}}信息管理系统<img src="../assets/comLogo.png" alt=""></el-col>   
    <el-col :span="12" :offset="8" class="comName">社会信用编号:{{companyInfor.comNum}}</el-col>
    <el-col :span="12" :offset="8" class="comName">企业地址：{{companyInfor.comaddr}}</el-col>
    <el-col :span="12" :offset="8" class="comName">企业简介：{{companyInfor.comdescript}}</el-col>
  </el-row>
</template>

<script>
export default {
  name: 'dashboard',
  data () {
    return {
      companyInfor:{
        //注意区分大小写
        comid:'',
        comName:'',
        comNum:'',
        comaddr:'',
        comdescript:'',
        comid:''
      }
    }
  },
  methods: {
    getAllComInfor(){
      let loginParam = JSON.parse(window.localStorage.getItem('access-user'));
      this.$http.post('api/user/getAllComInfor',{param:loginParam.comID},{}).then((response)=>{
        if(response){
          //console.log('获取成功');
          //console.log(response.body[0]);
          this.companyInfor = Object.assign({},response.body[0]);//覆盖整个companyInfor的值
          console.log('companyInfor');
          console.log(this.companyInfor);
        }
      });    
    }
  },
  mounted(){
    this.getAllComInfor();
  }
}
</script>
<style>
.comName{
  margin-top: 40px;
}
</style>
>