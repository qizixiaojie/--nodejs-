
import axios from 'axios';
import { ElMessage } from 'element-plus'; // 确保已正确安装和引入Element Plus  
// import useUserStore from '@/store/modules/interface/user'; // 如果需要，取消注释并正确使用  

const request = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 5000
});

// 请求拦截器（如果需要，取消注释并正确使用）  
request.interceptors.request.use((config) => {
  // ...  
  return config;
});

// 响应拦截器  
request.interceptors.response.use((response) => {
  //拦截成功的回调传入数据    
  if (response.data.code == 200) {
    ElMessage({
      type: 'success',
      message: '请求数据成功'
    })
  }
  return response.data;
}, (error) => {
  //处理http网络错误
  return Promise.reject(new Error(error.message))
})
export default request;