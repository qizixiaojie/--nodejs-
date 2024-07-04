import request from "@/util";

//添加医生信息
export const reqDoctor_add = (data) => {
  return request.post('/admin_doctor/doctor_add', data);
};
//获取医生信息
export const reqDoctor_getList = () => {
  return request.get('/admin_doctor/doctor_getList');
};
//删除医生信息
export const reqDoctor_delete = (id) => {
  return request.post('/admin_doctor/doctor_delete', { id });
};
//修改医生信息
export const reqDoctor_upload = (data) => {
  return request.post('/admin_doctor/doctor_update', data);
};
