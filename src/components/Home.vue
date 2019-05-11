<template>
  <el-container>
<!--头部-->
      <el-header>
          <el-row>
              <el-col >
                  <div class="title">
                  企业信息管理系统
                  </div>
              <div class="dropdown">
                  <el-dropdown split-button type="primary">                      
                      {{this.loginParam.username}}                     
                      <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item>个人信息</el-dropdown-item>
                          <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
                      </el-dropdown-menu>
                  </el-dropdown>
              </div>
              </el-col>
          </el-row>
      </el-header>
<!--中间部分-->
      <el-container>
<!--左侧边栏,导航菜单-->
          <el-aside width="200px">
              <el-menu
                mode="vertical"
                background-color="#fff"
                text-color="#606266"
                router
                active-text-color="#409EFF">
                    <el-menu-item index="/dashboard">首页</el-menu-item>
                    <el-menu-item  index= "/manage/cardManage">名片模板管理</el-menu-item>
                    <el-menu-item index = "/manage/employee">企业人员管理</el-menu-item>
                    <el-menu-item index = "/manage/companyIntro">自定义画册管理</el-menu-item>
                    <el-menu-item index = "/manage/companyInFor">企业介绍修改</el-menu-item>
              </el-menu>
          </el-aside>
<!--中间内容显示部分-->                   
          <el-main>
              <div>
                <router-view></router-view>
              </div>
          </el-main>
      </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
        activeIndex:"0",
        loginParam:''      
    }
  },
  methods: {
      getActiveIndex(index){
          this.activeIndex = index;
          console.log(index)
      },
      goToRouter(){
          this.$router.push(activeIndex)
      },
      logout(){
          this.$confirm('确认退出吗?', '提示', {
          confirmButtonClass: 'el-button--warning'
        }).then(() => {
            localStorage.removeItem('access-user');
            this.$router.go('/login');
        })
      }
  },
  mounted:function(){
      this.loginParam = JSON.parse(window.localStorage.getItem('access-user'));
      console.log(this.loginParam.username)
  }
}
</script>
<style>
  .title{
      float: left;
  }
   .dropdown{
       float: right;
   }

  .el-header, .el-footer {
    background-color: #409EFF;
    color: #fff;
    line-height: 60px;
    font-weight: bolder;
  }
  
  .el-aside {
    background-color: #fff;
    color: #409EFF;
    line-height: 400px;
    font-weight: bolder;
    font-size: larger;
    width: 180px;
  }
  
  .el-main {
    background-color: #fff;
    color: #333;
    line-height: 100%;
  }
  .el-menu{
      border:#fff;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 400px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 400px;
  }
</style>
