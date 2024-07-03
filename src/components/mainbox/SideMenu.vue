<template>
  <el-aside width="auto">
    <el-menu :collapse="$store.state.isCollapsed" :router="true" :default-active="route.fullPath">
      <el-menu-item index="/index">
        <el-icon><HomeFilled /></el-icon>
        <span>首页</span>
      </el-menu-item>
      <el-menu-item index="/center">
     <el-icon><user-filled /></el-icon>
        <span>个人中心</span>
      </el-menu-item>

      <el-sub-menu index="/Hospital">
        <template #title>
          <el-icon><School /></el-icon>
          <span>医院管理</span>
        </template>
        <el-menu-item index="/Hospital/HospitalAdd">添加医院</el-menu-item>
        <el-menu-item index="/Hospital/HospitalList">医院列表</el-menu-item>
      </el-sub-menu>

      <el-sub-menu index="/Doctor">
        <template #title>
          <el-icon><Avatar /></el-icon>  
          <span>医生管理</span>
        </template>
        <el-menu-item index="/Doctor/DoctorAdd">添加医生</el-menu-item>
        <el-menu-item index="/Doctor/DoctorList">医生列表</el-menu-item>
      </el-sub-menu>

    </el-menu>
  </el-aside>
</template>
<script setup>
import {HomeFilled,Avatar,UserFilled,School} from '@element-plus/icons-vue'
import { useRoute } from 'vue-router';
const route=useRoute()
</script>
<style lang="scss" scoped>
.el-aside {
  height: 100vh;
}
</style>
