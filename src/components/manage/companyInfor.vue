<template>
  <el-row>
<!--顶部面包屑装饰-->
    <el-col :span="24">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path:'/dashboard' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>企业介绍修改</el-breadcrumb-item>
        </el-breadcrumb>
    </el-col>
    <el-col :span="12">
      <el-form :model="companyInfor">
        <el-form-item label="企业名"><el-input v-model="companyInfor.comName"></el-input></el-form-item>
        <el-form-item label="企业社会编号"><el-input v-model="companyInfor.comNum"></el-input></el-form-item>
        <el-form-item label="企业地址"><el-input v-model="companyInfor.comaddr"></el-input></el-form-item>
        <el-form-item label="企业简介"><el-input v-model="companyInfor.comdescript"></el-input></el-form-item>
      </el-form>
      <el-button type="primary" @click="handleChange">修改</el-button>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'companyInfor',
  data () {
    return {
      companyInfor:{
        //注意区分大小写
        comid:'',
        comName:'',
        comNum:'',
        comaddr:'',
        comdescript:''
      }
    }
  },
  methods: {
    handleChange(){
      this.$http.post('api/user/changeComInfor',{content:this.companyInfor},{}).then((response)=>{
        if(response){
          console.log('成功修改');
          this.$message({message:'成功修改！返回首页查看效果',type:'success'});
        }
      });
      this.getAllComInfor();
    },
    getAllComInfor(){
      let loginParam = JSON.parse(window.localStorage.getItem('access-user'));
      this.$http.post('api/user/getAllComInfor',{param:loginParam.comID},{}).then((response)=>{
        if(response){
          //console.log('获取成功');
          console.log(response.body[0]);
          this.companyInfor = Object.assign({},response.body[0]);
          console.log('companyInfor');
          console.log(this.companyInfor);
        }
      });    
    }
  },
  mounted:function(){
    this.getAllComInfor();
  }
}
</script>