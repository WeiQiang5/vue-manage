import axios from './axios';


export const getMenu = params => {
  return axios.request({
    url:'/permission/getMenu',
    methods:'post',
    data:params//params是直接get请求使用post请求需要使用data
  })
}

export const getData = () => {
  return axios.request({
    url:'/home/getData'
  })
}

export const getUser = params => {
  return axios.request({
    url:'/user/getUser',
    methods:'get',
    params
  })
}
