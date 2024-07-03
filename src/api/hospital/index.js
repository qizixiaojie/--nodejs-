import request from "@/util";

//添加医院信息
export const reqHospial_add = (data) => {
  return request.post('/admin_hospital/hospital_add', data);
};