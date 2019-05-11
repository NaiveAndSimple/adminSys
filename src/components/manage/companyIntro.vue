<template>
 <el-row>
<!--顶部面包屑装饰-->
    <el-col :span="24">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path:'/dashboard' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>自定义画册管理</el-breadcrumb-item>
        </el-breadcrumb>
    </el-col>
    <el-col :span="12" :offset="6" class="uploadWidget">
      <el-upload action="api/upload/uploadCompanyIntro"
      :on-success="handleSuccess"
      :on-remove="handleRemove"
      :file-list="uploadFileList"
      :before-upload="beforeUpload">
        <el-button size="small" type="primary">点击上传画册到服务器</el-button>
      </el-upload>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'cardManage',
  data () {
    return {
      //测试用数据
      uploadFileList:[{name:'画册数据1'}],
      loginParam:''
    }
  },
  created:function(){
    this.loginParam = JSON.parse(window.localStorage.getItem('access-user'));
    this.$http.post('api/upload/getAllIntro',{param:this.loginParam},{}).then((response)=>{
      if(response){
        this.uploadFileList = response.body;
      }else{
        this.$message({message:'获取数据出错',type:'error'})
      }
    })
  },
  methods: {
    handleSuccess(file){
      let param = {userid:this.loginParam.userid,filename:file.name}
      this.$http.post('api/upload/saveFileInfor',{param:param},{}).then((response)=>{
        if(response){
          this.$message({message:'成功上传',type:'success'});
        }
      })
    },
    beforeUpload(file){
      console.log(file);
    },
    handleRemove(file){      
      this.$message({message:'删除成功',type:'success'})
    }
  }
}
</script>
<style>
.uploadWidget{
  margin-top: 20px;
  text-align: center;
  background-color: aliceblue;
}
</style>
