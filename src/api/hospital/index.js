import request from "@/util";

//添加医院信息
export const reqHospial_add = (data) => {
  return request.post('/admin_hospital/hospital_add', data);
};
//获取医院列表信息
export const reqHospial_getList = () => {
  return request.get('/admin_hospital/hospital_getList');
};
//删除医院列表细心呐
export const reqHospial_Delete = (id) => {
  return request.post('/admin_hospital/hospital_delete', { id });
};
//更改医院信息
export const reqHospial_upload = (data) => {
  return request.post('/admin_hospital/hospital_update', data);
}