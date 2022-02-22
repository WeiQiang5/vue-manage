<template>
  <el-container style="height:100%">
    <CommonAside/>
    <el-container>
      <el-header>
        <CommonHeader/>
      </el-header>
      <el-main>
        <CommonTag/>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// @ is an alias to /src
import CommonAside from '../components/CommonAside';
import CommonHeader from '../components/CommonHeader';
import CommonTag from '../components/CommonTag'
export default {
  name: "Home",
  components: {
    CommonAside,
    CommonHeader,
    CommonTag
  }
};
</script>

<style lang="scss" scoped>
.el-header {
  background: #333;
}
.el-main {
  padding-top: 0;
}
</style>
