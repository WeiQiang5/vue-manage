<template>
  <div class="tabs">
    <el-tag
      v-for="(tag,index) in tags"
      :key="tag.name"
      :closable="tag.name!=='home'"
      @click="changeMenu(tag)"
      @close="handleClose(tag,index)"
      :effect="$route.name == tag.name ? 'light' : 'plain'"
      size="small"
    >{{tag.label}}</el-tag>
  </div>
</template>

<script>
import { mapState,mapMutations } from 'vuex'
export default {
  name:'CommonTag',
  data(){
    return{

    }
  },
  computed:{
    ...mapState({
      tags:state => state.tab.tabsList
    })
  },
  methods:{
    ...mapMutations({
      close:'closeTag'
    }),
    changeMenu(tag){
      this.$router.push({
        name:tag.name
      })
    },
    handleClose(tag,index){
      let length = this.tags.length - 1;
      this.close(tag)
      if(tag.name !== this.$route.name){
        return
      }
      if(index === length){
        this.$router.push({
          name:this.tags[length-1].name
        })
      }else{
        this.$router.push({
          name:this.tags[index].name
        })
      }
    }
  }
}
</script>

<style lang='scss' scope>
.tabs{
  height: 35px;
  line-height: 40px;
  margin: 10px 0px 10px 0px;
  display: flex;
  align-items: center;
  .el-tag:not(:first-child){
    margin-left: 10px;
  }
  .el-tag{
    cursor: pointer;
  }
}
</style>