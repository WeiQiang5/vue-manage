let tabsList = [
  {
    path:'/home',
    name:'home',
    label:'首页',
    icon:'s-home'
  }
];
localStorage.setItem('tabsList',JSON.stringify(tabsList))

export default {
  state:{
    isCollapse:false,
    tabsList:JSON.parse(localStorage.tabsList) || tabsList,
    currentMenu:localStorage.currentMenu || null,
    menu:[]
  },
  mutations:{
    collapseMenu(state){
      state.isCollapse = !state.isCollapse
    },
    selectMenu(state,val){
      if(val.name !== 'home'){
        state.currentMenu = val;
        let tabsList = JSON.parse(localStorage.tabsList);
        let result = tabsList.findIndex(item => item.name === val.name);
        if(result === -1){//说明tabsList没有此数据，因此加入
          tabsList.push(val);
          state.tabsList = tabsList;
          localStorage.setItem('tabsList',JSON.stringify(tabsList));
        }else{
          state.currentMenu = null;
          localStorage.setItem('currentMenu',null);
        }
      }
    },
    closeTag(state,val){
      let tabsList = state.tabsList
      let index = tabsList.findIndex(item =>  item.name === val.name);
      tabsList.splice(index,1)
      state.tabsList = tabsList
      localStorage.setItem('tabsList',JSON.stringify(tabsList));
    },
    setMenu(state,val){
      state.menu = val;
      localStorage.setItem('menu',JSON.stringify(val))
    },
    clearMenu(state){
      state.menu = []
      localStorage.removeItem('menu')
    },
    addMenu(state,router){
      if(!localStorage.menu){
        return
      }
      let menu = JSON.parse(localStorage.menu)
      state.menu = menu
      let arr = [];
      menu.forEach(item => {
        if(item.children){
          item.children = item.children.map(item => {
            item.component = () => import(`../views/${item.url}`);
            return item;
          })
          arr = arr.concat(item.children)
        }else{
          item.component = () => import(`../views/${item.name}`)
          arr.push(item)
        }
      });
      //路由的动态添加
      arr.forEach(item => {
        router.addRoute('Main',item)
      })

      console.log(router)
    }
  }
}