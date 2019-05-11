<template>
 <el-row>
<!--顶部面包屑装饰-->
    <el-col :span="24">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path:'/dashboard' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>企业人员管理</el-breadcrumb-item>
        </el-breadcrumb>
    </el-col>

    <el-col :span="24">
    <!--查询,新增工具条-->
      <el-col :span="24" class="toolbar">
        <el-form :inline="true" class="searchForm" :model="filter" >
          <el-form-item>
            <el-input :inline="true" placeholder="企业人员信息" v-model="filter.searchField"></el-input>           
          </el-form-item>
          <el-form-item>            
            <el-button type="primary" @click="searchEmployee">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addformVisible=true">新增</el-button>
          </el-form-item>
        </el-form>
      </el-col>
<!--数据显示表格-->
      <el-table :data="employee" border style="width : 100%;" highlight-current-row @selection-change="getSelect">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" width="60"></el-table-column>
        <el-table-column prop="eName" label="姓名" sortable></el-table-column>
        <el-table-column prop="eAge" label="年龄" sortable></el-table-column>
        <el-table-column prop="eSex" label="性别"></el-table-column>
        <el-table-column prop="eDepartment" label="部门" sortable></el-table-column>
        <el-table-column prop="ePosition" label="职位" ></el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button size="small" @click="showEditDiag(scope.row)" >编辑</el-button>
            <el-button size="small" type="danger" @click="delEmployee(scope.$index,scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
<!--分页工具条与批量删除-->
      <el-col :span="24" class="footToolBar">
        <el-button type="danger" @click="deleteMany" :disabled="this.select.length===0">批量删除</el-button>
        <el-pagination style="float:right;" layout="prev,pager,next" :page-size="7" @current-change="handleCurrentChange" :total="total">
        </el-pagination>
      </el-col>
<!--编辑数据页面-->
      <el-dialog title="编辑" :visible.sync ="editformVisible" :close-on-click-modal="false">
        <el-form :model="editForm">
          <el-form-item label="姓名" >
            <el-input v-model="editForm.eName"></el-input>
          </el-form-item>
          <el-form-item label="年龄" >
            <el-input v-model="editForm.eAge"></el-input>
          </el-form-item>
          <el-form-item label="性别" >
            <el-input v-model="editForm.eSex"></el-input>
          </el-form-item>
          <el-form-item label="部门" >
            <el-input v-model="editForm.eDepartment"></el-input>
          </el-form-item>
          <el-form-item label="职位" >
            <el-input v-model="editForm.ePosition"></el-input>
          </el-form-item>
        </el-form>
        <div>
          <el-button @click.native="editformVisible = false">取消</el-button>
          <el-button type="primary" @click.native="editSubmit">提交修改</el-button>
        </div>
      </el-dialog>
<!--新增数据界面-->
      <el-dialog title="新增" :visible.sync="addformVisible" :close-on-click-modal="false">
        <el-form :model="addForm">
          <el-form-item label="姓名" >
            <el-input v-model="addForm.eName"></el-input>
          </el-form-item>
          <el-form-item label="年龄" >
            <el-input v-model="addForm.eAge"></el-input>
          </el-form-item>
          <el-form-item label="性别" >
            <el-input v-model="addForm.eSex"></el-input>
          </el-form-item>
          <el-form-item label="部门" >
            <el-input v-model="addForm.eDepartment"></el-input>
          </el-form-item>
          <el-form-item label="职位" >
            <el-input v-model="addForm.ePosition"></el-input>
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
      //分页的页数判断
      total:8,
      //员工信息
      employee:[],      
      //编辑相关
      editformVisible:false,
      editForm:{
        eid:0,
        eName:'',
        eAge:0,
        eSex:'',
        eDepartment:'',
        ePosition:''
      },
      //新增相关
      addformVisible:false,
      addForm:{
        eid:0,
        eName:'',
        eAge:0,
        eSex:'',
        eDepartment:'',
        ePosition:'',
      },
      //查询相关
      filter:{
        searchField:''
      },
      //分页获得员工信息
      page:1,
      limit:7 ,
      //批量删除相关
      select:[] //seletion选中列数   
    }
  },
  methods: {
    //获取所有员工
    getAllemployee(){
      let that = this;
      let param = {
        page: this.page,
        limit:this.limit
      };
      that.$http.post('api/employee/getAllemployee',{content:param},{}).then((response)=>{
        //console.log(response.body);
        that.employee = response.body;
      });
      this.getTotalEmployee();
    },
    //获得员工总数
    getTotalEmployee(){
      this.$http.get('api/employee/getTotalEmployee',{},{}).then((response)=>{
        //console.log(this.total)
        this.total= response.body.length;
      });
    },
    //更新数据库记录
    editSubmit(){
      let para = Object.assign({},this.editForm);
      this.$http.post('api/employee/updateEmployee',{content:para},{}).then((response)=>{
        console.log('修改数据');
        if(response){
          this.$message({message:'修改成功',type:'success'});
          this.editformVisible = false;
        }
      });
      this.getAllemployee();
    },
    showEditDiag(row){
      this.editformVisible = true;
      this.editForm = Object.assign({},row)
    },
    //新增数据库记录
    addSubmit(){
      let para = Object.assign({},this.addForm);
      this.$http.post('api/employee/addEmployee',{content:para},{}).then((response)=>{
        console.log('新增数据');
        if(response){
          this.$message({message:'成功新增数据',type:'success'});
          this.addformVisible = false;
        }
      });
      this.getAllemployee();
    },
    //删除一条记录
    delEmployee(index,row){
      this.$confirm('确认删除该记录？','提示',{type:'waring'}).then(()=>{
        this.$http.post('api/employee/delEmployee',{content:row.eid},{}).then((response)=>{
          console.log('删除数据');
          if(response){
            this.$message({message:'成功删除数据',type:'success'});
            this.addformVisible = false;
          }
        });
        this.getAllemployee();
      });
      
    },
    //员工查询功能
    searchEmployee(){
      let that = this;
      let para = Object.assign({},this.filter);
      this.$http.post('api/employee/searchEmployee',{content:para},{}).then((response)=>{
        console.log('查询数据');
        this.employee = response.body;
        this.total = response.body.length;
      });
      this.filter.searchField = '';
    },
    //分页查询
    handleCurrentChange(val){
      this.page = val;
      this.getAllemployee();
    },
    //批量删除
    getSelect(select){
      this.select = select;
    },
    deleteMany(){
      let selectID = (this.select.map(item=>item.eid)).toString();
      console.log(selectID);
      this.$http.post('api/employee/deleteMany',{content:selectID},{}).then((response)=>{
        if(response){
          this.$message({message:'成功删除数据',type:'success'})
        }
      });
      this.getAllemployee();
    }
  },
  mounted : function(){
    this.getAllemployee();
  }
}
</script>
<style>
.toolbar{
  margin-top: 15px;
}
.searchForm{
  float: right;
}
.footToolBar{
  margin-top: 10px;
}

</style>
