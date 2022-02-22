<template>
  <div class="header">
    <div class="i-content">
      <el-button @click="clickBtn" plain icon="el-icon-menu" size="mini" class="button"></el-button>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="item in tags" :key="item.name" :to="{ path: item.path }">{{item.label}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown trigger='click' size="mini">
        <span class="imgBox">
          <img :src="userImg" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item @click.native="logOut">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name:'CommonHeader',
  data(){
    return{
      userImg:require('../assets/user.png')
    }
  },
  computed: {
    ...mapState({
      tags:state => state.tab.tabsList
    })
  },
  methods: {
    clickBtn(){
      this.$store.commit('collapseMenu');
    },
    logOut(){
      this.$store.commit('clearToken');
      this.$store.commit('clearMenu');
      this.$router.push({
        name:'login'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.header{
  display: flex;
  height: 60px;
  line-height: 60px;
  flex-direction:row;//排列方向:横排
  justify-content: space-between;
  align-items:center;
  .i-content{
    display: flex;
    align-content: center;
    .button{
      height: 40px;
      margin: 10px 0px;
    }
    .el-breadcrumb{
      line-height: 60px;
      margin-left: 10px;
      ::v-deep .el-breadcrumb__inner.is-link{
        color: #606266;
      }
      ::v-deep .el-breadcrumb__item:last-child .el-breadcrumb__inner{
        color: #fff;
      }
    }
  }
  .r-content{
    ::v-deep .el-dropdown{
      height: 60px;
    }
    span{
      display: inline-block;
      width: 40px;
      height: 40px;
      margin: 10px auto;
    }
  }
  .i-content,.r-content{
    height: 100%;
  }
}
</style>