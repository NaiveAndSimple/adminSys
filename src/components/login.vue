<template>
    <el-row>
    <el-col :span="12" :offset="9">
        <el-form ref="AccountFrom" :model="account" :rules="rules" label-position="left" label-width="0px"
                class="demo-ruleForm login-container">
            <h3 class="title">管理员登录</h3>
                <el-form-item prop="username">
                <el-input type="text" v-model="account.username" auto-complete="off" placeholder="账号"></el-input>
            </el-form-item>
            <el-form-item prop="pwd">
                <el-input type="password" v-model="account.pwd" auto-complete="off" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item style="width:100%;">
                <el-button type="primary" style="width:100%;" @click.native.prevent="handleLogin">登录</el-button>
            </el-form-item>
        </el-form>
    </el-col>
  </el-row>
</template>
<script>
export default {
  data(){
      return {
          account:{
              username:'admin',
              pwf:'admin'
          },
          rules:{
              username:[{required: true, message: '请输入账号',trigger:'blur'}],
              pwd:[{required: true, message:'请输入密码', trigger:'blur'}]
          }
      }
  },
  methods:{
      handleLogin(){
        let that = this;
        this.$refs.AccountFrom.validate((valid)=>{
            if(valid){
                let loginparam = {username:this.account.username, pwd:this.account.pwd};
                this.$http.post('api/login/LoginCheck',{content:loginparam},{}).then((response)=>{
                    if(response){
                        if(response.body.length !== 0 ){
                            console.log(response.body[0]);
                            localStorage.setItem('access-user',JSON.stringify(response.body[0]));
                            this.$message({message:'登录成功',type:"success"});
                            that.$router.push({path:'/'});
                        }else
                        {
                            this.$message({message:'登录失败，请检查账号或者密码！',type:"error"});
                        }
                    }
                })
            }
        })    
      }
  }
}
</script>
<style>
.login-container{
    width: 300px;
    margin-top: 150px;
}
</style>
