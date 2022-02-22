<template>
  <div class="manage">
    <el-dialog :title="operateType === 'add' ?'新增用户' : '更新用户'" :visible.sync="isShow">
      <common-form :formLabel="opertateFormLabel" :form="operateForm" :inline="true" ref="form"></common-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow=false">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </div>
    </el-dialog>

    <div class="manage-header">
      <el-button type="primary" @click="addUser">新增</el-button>
      <common-form :formLabel="formLabel" :form="searchForm" ref="form" :inline="true">
        <el-button type="primary" @click="getList(searchForm.keyword)">搜索</el-button>
      </common-form>
    </div>

    <common-table 
      :tableData="tableData" 
      :tableLabel="tableLabel"
      :config="config"
      @changePage="getList()"
      @edit="editUser"
      @delete="delUser"
    ></common-table>
  </div>
</template>

<script>
import CommonForm from "@/components/CommonForm";
import CommonTable from '@/components/CommonTable';
import {getUser} from '@/api/data.js'
export default {
  name: "User",
  components: {
    CommonForm,
    CommonTable
  },
  data() {
    return {
      operateType: "add",
      isShow: false,
      opertateFormLabel: [
        {
          model: "name",
          label: "姓名",
          type: "input"
        },
        {
          model: "age",
          label: "年龄",
          type: "input"
        },
        {
          model: "sex",
          label: "性别",
          type: "select",
          opts: [
            {
              label: "男",
              value: 1
            },
            {
              label: "女",
              value: 0
            }
          ]
        },
        {
          model: "birth",
          label: "出生日期",
          type: "date"
        },
        {
          model: "addr",
          label: "地址",
          type: "input"
        }
      ],
      operateForm:{
        name:'',
        addr:'',
        age:'',
        birth:'',
        sex:''
      },
      formLabel:[{
        model:'keyword',
        label:'',
        type:'input'
      }],
      searchForm:{
        keyword:''
      },
      tableData:[],
      tableLabel:[
        {
          prop:'name',
          name:'姓名'
        },
        {
          prop:'age',
          name:'年龄'
        },
        {
          prop:'sex',
          name:'性别'
        },
        {
          prop:'birth',
          name:'出生日期',
          width:200
        },
        {
          prop:'addr',
          name:'地址',
          width:320
        },
      ],
      config:{
        page:1,
        total:30
      }
    };
  },
  created () {
    this.getList()
  },
  methods:{
    confirm(){
      if(this.operateType === 'edit'){
        this.$http.post('/user/edit',this.operateForm).then(res => {
          this.isShow = false
          console.log(res);
          this.getList()
        })
      }else{
        this.$http.post('/user/add',this.operateForm).then(res => {
          console.log(res);
          this.isShow = false
          this.getList()
        })
      }
    },
    addUser(){
      this.isShow = true
      this.operateType = 'add'
      this.operateForm = {
        name:'',
        addr:'',
        age:'',
        birth:'',
        sex:''
      }
    },
    editUser(row){
      console.log(row);
      this.operateType = 'edit';
      this.isShow = true;
      this.operateForm = row;
    },
    delUser(row){
      this.$confirm("此操作将永久删除该文件,是否继续?",'提示',{
        confirmButtonText:'确认',
        cancelButtonText:'取消',
        type:'warning'
      }).then(() => {
        const id = row.id;
        this.$http.post('/user/del',{
          params:{id}
        }).then(() => {
          console.log(this);
          this.$message({
            type:'success',
            message:'删除成功'
          })
          this.getList()
        })
      })
    },
    getList(name){
      //获取数据前
      this.config.loading = true;
      //搜索变为1
      name ? ( this.config.page = 1) : '';
      getUser({
        page:this.config.page,
        name  
      }).then(res => {
        console.log(res);
        let {list,count} = res.data
        this.tableData = list.map(item => {
          item.seaxLabel = item.set === 0 ? '女' : '男';
          return item;
        })
        this.config.total = count;                                                                
        this.config.loading = false;
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.manage-header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  ::v-deep .el-form .el-form-item{
    margin-bottom: 0;
  }
}
</style>