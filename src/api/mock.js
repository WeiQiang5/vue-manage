import Mock from 'mockjs'
import homeApi from './mockServeData/home'
import UserApi from './mockServeData/user'
import permissionApi from './mockServeData/permission'


Mock.mock('/permission/getMenu',permissionApi.getMenu)
Mock.mock('/home/getData',homeApi.getStatisticalData)
Mock.mock(/user\/add/,'post',UserApi.createUser)
Mock.mock(/user\/edit/,'post',UserApi.updateUser)
Mock.mock(/user\/getUser/,'get',UserApi.getUserList)
Mock.mock(/user\/del/,'post',UserApi.deleteUser)
