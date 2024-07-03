import axios from 'axios'

function upload(path, userForm) {
  //变成表单数据进行上传
  const params = new FormData()
  for (let i in userForm) {
    params.append(i, userForm[i])
  }
  // console.log(params)
  return axios
    .post(path, params, {
      headers: {
        //如果是传入多个文件内容就是这样子
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(res => res.data)
}
export default upload
