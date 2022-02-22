<template>
  <el-aside style="width:auto;height:auto;background-color:#545c64">
    <h3 class="title">通用后台管理系统</h3>
    <el-menu
      :default-active="active"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <template v-if="noChildren.length">
        <el-menu-item v-for="child in noChildren" :key="child.path" :index="child.path" @click="clickMenu(child)">
          <i :class="`el-icon-${child.icon}`"></i>
          <span slot="title">{{child.label}}</span>
        </el-menu-item>
      </template>
      <!-- 这已经做了有无children属性的判断 -->
      <template v-if="haveChildren.length">
        <el-submenu v-for="(child,index) in haveChildren" :key="child.path" :index="''+index">
          <template slot="title">
            <i :class="`el-icon-${child.icon}`"></i>
            <span slot="title">{{child.label}}</span>
          </template>
          <el-menu-item-group v-for="son in child.children" :key="son.path">
            <el-menu-item :index="son.path" @click="clickMenu(son)">{{son.label}}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </template>
    </el-menu>
  </el-aside>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: "commonAside",
  data() {
    return {
  
    };
  },
  computed: {
    noChildren() {
      return this.asyncMenu.filter(item => !item.children);
    },
    haveChildren() {
      return this.asyncMenu.filter(item => item.children);
    },
    // ...mapState(isCollapse)
    isCollapse(){
      return this.$store.state.tab.isCollapse
    },
    active(){
      return `/${this.$route.name}`
    },
    asyncMenu(){
      return this.$store.state.tab.menu
    }
  },
  created () {
    console.log(this.asyncMenu)
  },
  methods: {
    clickMenu(item){
      this.$router.push({
        name:item.name 
      })
      this.$store.commit('selectMenu',item)
      console.log(this.$store.state.tab);
    }
  }
};
</script>

<style lang='scss' scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.title{
  font-size: 16px;
  text-align: center;
  color: #fff;
  line-height: 48px;
}
</style>