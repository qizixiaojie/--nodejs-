import request from "@/util";

//添加医生信息
export const reqDoctor_add = (data) => {
  return request.post('/admin_doctor/doctor_add', data);
};