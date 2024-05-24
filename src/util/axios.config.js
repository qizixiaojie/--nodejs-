import axios from 'axios'

// 添加请求拦截器
axios.interceptors.request.use(
  function (config) {
    // 在请求发送之前做些什么
    // 从 localStorage 获取 token
    const token = localStorage.getItem('token')
    // 将 token 添加到请求头的 Authorization 字段中
    config.headers.Authorization = `Bearer ${token}`

    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    // 任何状态码在 2xx 范围内的响应都会触发这个函数
    // 对响应数据做些什么
    const { authorization } = response.headers
    // 如果响应头中包含 authorization 字段，将其存储到 localStorage 中
    authorization && localStorage.setItem('token', authorization)
    return response
  },
  function (error) {
    // 任何状态码超出 2xx 范围的响应都会触发这个函数
    // 对响应错误做些什么
    if (error.response) {
      const { status } = error.response
      if (status === 401) {
        // 重定向到登录页面
        localStorage.removeItem('token')
        window.location.href = '#/login'
      }
    }
    return Promise.reject(error)
  }
)
