//动态渲染路由数据

import Home from '@/views/home/Home.vue'
import Center from '@/views/center/Center.vue'
import  DoctorAdd from '@/views/Doctor/DoctorAdd.vue'
import DoctorList from '@/views/Doctor/DoctorList.vue'
import  HospitalAdd from '@/views/Hospital/HospitalAdd.vue'
import HospitalList from '@/views/Hospital/HospitalList.vue'

import NotFound from '@/views/notfount/NotFound.vue'
const routes = [
  {
    path: '/index',
    component: Home
  },
  {
    path: '/center',
    component: Center
  },
  {
    path: '/Hospital/HospitalAdd',
    component: HospitalAdd
  },
  {
    path: '/Hospital/HospitalList',
    component: HospitalList
  },
  {
    path: '/Doctor/DoctorAdd',
    component: DoctorAdd
  },
  {
    path: '/Doctor/DoctorList',
    component: DoctorList
  },
  {
    path:'/',
    redirect:'/index'
  },
  {
    path:'/:pathMatch(.*)*',
    name:"Notfound",
    component:NotFound
  }
]
export default routes
