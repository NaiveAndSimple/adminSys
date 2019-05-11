<template>
 <el-row>
<!--顶部面包屑装饰-->
    <el-col :span="24">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path:'/dashboard' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>名片模板管理</el-breadcrumb-item>
        </el-breadcrumb>
    </el-col>

    <el-col :span="24">
    <!--查询,新增工具条-->
      <el-col :span="24" class="toolbar">
        <el-form :inline="true" class="searchForm" :model="filter">
          <el-form-item>
            <el-input :inline="true" placeholder="名片模板名" v-model="filter.styleName"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="warphandleSearch" >查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addformVisible = true">新增</el-button>
          </el-form-item>
        </el-form>
      </el-col>
<!--数据显示表格-->
      <el-table :data="mods" style="width : 100%;" highlight-current-row v-loading="loading">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" width="60"></el-table-column>
        <el-table-column prop="modaddr" label="模板">
          <template slot-scope="scope">
            <img :src="scope.row.modaddr" style="width:100px;height:50px">
          </template>
        </el-table-column>
        <el-table-column prop="modstyle" label="模板风格"></el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button size="small" @click="showEditDiag(scope.row)" >编辑</el-button>
            <el-button size="small" type="danger" disabled>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
<!--分页工具条与批量删除-->
      <el-col :span="24" class="footToolBar">
        <el-button type="danger" disabled>批量删除</el-button>
        <el-pagination style="float:right;" layout="prev,pager,next" :page-size="6" :total="total">
        </el-pagination>
      </el-col>
<!--编辑数据页面-->
      <el-dialog title="编辑" :visible.sync ="editformVisible" :close-on-click-modal="false">
        <el-form :model="editForm" >
          <el-form-item label="模板url链接" prop="modaddr">
            <el-input v-model="editForm.modaddr"></el-input>
          </el-form-item>
          <el-form-item label="模板风格" prop="modstyle">
            <el-input v-model="editForm.modstyle"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button @click.native="editformVisible = false">取消</el-button>
          <el-button type="primary" @click.native="editSubmit">提交修改</el-button>
        </div>
      </el-dialog>
<!--新增数据界面-->
      <el-dialog title="新增" :visible.sync="addformVisible" :close-on-click-modal="false">
        <el-form :model="addForm">
          <el-form-item label="模板url链接" prop="modaddr"></el-form-item>
          <el-input v-model="addForm.modaddr"></el-input>
          <el-form-item label="模板风格" prop="modstyle">
            <el-input v-model="addForm.modstyle"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button @click.native="addformVisible = false">取消</el-button>
          <el-button type="primary" @click.native="addSubmit">确认新增</el-button>
        </div>
      </el-dialog>

    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'cardManage',
  data () {
    return {
      total:1,
      //数据库数据
      mods:[],
      loading : false,
      //修改数据
      editformVisible:false,
      editForm:{
        modid:0,
        modaddr:'',
        modstyle:''
      },
      //新增数据
      addformVisible:false,
      addForm:{
        modaddr:'66',
        modstyle:'666'
      },
      //查询关键词
      filter:{
        styleName:''
      }      
    }
  },

  methods: {
    //获取全部数据的方法
    search(){
      let that = this;
      that.$http.get('api/user/getMods',{},{}).then((response)=>{
        console.log(response.body);
        that.mods = response.body;
        this.total = response.body.length;
      })
    },
    //更新数据相关界面
    showEditDiag(row){
      this.editformVisible = true;
      this.editForm = Object.assign({},row);
    },
    editSubmit(){
      let para = Object.assign({},this.editForm);
      this.$http.post('api/user/updateMod',{content:para},{}).then((response)=>{
        console.log('修改数据')
        if(response){
          this.$message({message:'修改成功',type:'success'});
          this.editformVisible = false;
        }
      });
      this.search();
    },
    //新增数据相关界面
    showAddDiag(){
      this.addformVisible = true;
    },
    addSubmit(){
      let para = Object.assign({},this.addForm);
      this.$http.post('api/user/addMod',{content:para},{}).then((response)=>{
        console.log('新增数据')
        if(response){
          this.$message({message:'成功新增数据',type:'success'});
          this.addformVisible = false;
        }
      })
      this.search();
    },
    //查询功能相关
    handleSearch(){
      let that = this;
      let para = Object.assign({},this.filter);
      that.$http.post('api/user/searchMod',{content:para},{}).then((response)=>{
        console.log('查询数据');
        console.log(response.body);
        that.mods = response.body;
        this.total = response.body.length;
      })
      this.filter.styleName = "";
    },
    warphandleSearch(){
      this.handleSearch();
    }

  },
  mounted:function(){
    this.search();
  }
}
</script>
<style>
.toolbar{
  margin-top: 15px;
}
.searchForm{
  float: center;
}
.footToolBar{
  margin-top: 10px;
}

</style>
