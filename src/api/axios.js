import axios from 'axios';
import config from '../config';

const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro;


let instance = axios.create({
  baseUrl,//调用接口
  timeout:1000,
  headers: {'X-Custom-Header': 'foobar'}
})
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// 添加请求拦截器
//所有发送的请求都要在这过一次，通过这个，我们可以把token传到后台
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  console.log(response);
  return response;
}, function (error) {
  console.log(error);
  // 对响应错误做点什么
  return Promise.reject(error);
});

export default instance