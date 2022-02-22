<template>
  <el-form
    :model="form"
    status-icon
    :rules="rules"
    ref="form"
    label-width="100px"
    class="login_container"
  >
    <h3 class="login_title">系统登录</h3>
    <el-form-item label="用户名" prop="userName" class="username">
      <el-input type="input" v-model="form.username" placeholder="请输入账号"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password" class="password">
      <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="login" class="login_submit">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import Mock from 'mockjs';
import { getMenu } from '../../api/data'
export default {
  name:'login',
  data(){
    return{
      form:{
        username:'',
        password:''
      },
      rules:{
        userName:[
          {require:true,message:"请输入用户名",trigger:'blur'},
          {min:3,message:'用户名长度不能小于3位',trigger:'blur'}
        ],
        password:[
          {require:true,message:"请输入密码",trigger:'blur'}
        ]
      }
    }
  },
  methods:{
    login(){
      getMenu(this.form).then(({data}) => {
        console.log(data);
        if(data.code === 20000){
          this.$store.commit('clearMenu')
          this.$store.commit('setMenu',data.data.menu)
          this.$store.commit('setToken',data.data.token)
          this.$store.commit('addMenu',this.$router)
          this.$router.push({name:'home'})
        }else{
          this.$message.warning(data.data.message)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login_container{
  border-radius: 15px;
  background-clip: padding-box;
  margin: 100px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.login_title{
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
.login_submit{
  margin: 10px auto 0 auto;
}
</style>