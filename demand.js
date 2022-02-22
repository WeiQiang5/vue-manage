import Vue from 'vue';
//按需引入elementui组件
import { Button,Container,Header,Aside,Main,MenuItem,MenuItemGroup,Menu,Submenu,Dropdown,DropdownMenu,DropdownItem,Row,Col,Card,Table,TableColumn,Breadcrumb,BreadcrumbItem,Tag,Form,FormItem,Input,Select,Switch,DatePicker,Option,Dialog,Pagination,MessageBox,Message } from 'element-ui';

let arr =  [Button,Container,Header,Aside,Main,MenuItem,MenuItemGroup,Menu,Submenu,Dropdown,DropdownMenu,DropdownItem,Row,Col,Card,Table,TableColumn,Breadcrumb,BreadcrumbItem,Tag,Form,FormItem,Input,Select,Switch,DatePicker,Option,Dialog,Pagination,Message];

function OffEl(word){
  return word.slice(2).toLowerCase();
}
arr.forEach(item => {
  Vue.prototype['$' + OffEl(item.name)] = item;
  Vue.use(item)
})
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;
export default Vue;