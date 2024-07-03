<template>
  <div>
    <el-page-header icon="" title="企业门户网站管理系统">
      <template #content>
        <span class="text-large font-600 mr-3"> 个人中心 </span>
      </template>
    </el-page-header>

    <!-- 头像部分 -->
    <el-row :gutter="20" class="el-row">
      <el-col :span="8">
        <el-card class="box-card">
          <el-avatar :size="100" :src="avataUrl" />
          <h3>{{ store.state.userInfo.username }}</h3>
          <h3>{{ store.state.userInfo.role === 1 ? "管理员" : "编辑" }}</h3>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>个人信息</span>
            </div>
          </template>
          <el-form
            ref="userFormRef"
            :model="userForm"
            :rules="userFormRules"
            label-width="auto"
            class="demo-ruleForm"
          >
            <el-form-item label="用户名" prop="username">
              <el-input v-model="userForm.username" />
            </el-form-item>

            <el-form-item label="性别" prop="gender">
              <el-select
                v-model="userForm.gender"
                placeholder="Select"
                size="large"
                style="width: 240px"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="个人简介" prop="introduction">
              <el-input v-model="userForm.introduction" type="textarea" />
            </el-form-item>

            <el-form-item label="头像">
              <Upload :avatar="userForm.avatar" @keywinchange="handleChange" />
            </el-form-item>

            <el-form-item style="margin-left: 50%">
              <el-button
                type="primary"
                @click="submitForm()"
                style="width: 120px; height: 50px; font-size: 20px"
                >更新</el-button
              >
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script setup>
import { useStore } from "vuex";
import Upload from "@/components/upload/Upload.vue";
// import { Plus } from '@element-plus/icons-vue'
import { computed, ref, reactive } from "vue";
// import axios from 'axios'
import upload from "@/util/upload";
import { ElMessage } from "element-plus";
//渲染头像
const store = useStore();
const avataUrl = computed(() =>
  store.state.userInfo.avatar
    ? "http://localhost:3000" + store.state.userInfo.avatar
    : `https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png`
);

//制定校验规则
const { username, gender, introduction, avatar } = store.state.userInfo;
const userFormRef = ref();
const userForm = reactive({
  username,
  gender,
  introduction,
  avatar,
  file: null,
});
const userFormRules = reactive({
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  gender: [{ required: true, message: "请输入你的性别", trigger: "blur" }],
  introduction: [{ required: true, message: "输入介绍", trigger: "blur" }],
  avatar: [{ required: true, message: "请上传头像", trigger: "blur" }],
});
//性别选择
const options = [
  { label: "保密", value: 0 },
  { label: "男", value: 1 },
  { label: "女", value: 2 },
];
//每次选择图片之后的回调,显示图片
const handleChange = (file) => {
  console.log(file.raw);
  userForm.avatar = URL.createObjectURL(file);
  userForm.file = file;
};
//更新提交方法,前提经过表单校验validate
const submitForm = () => {
  userFormRef.value.validate(async (valid) => {
    if (valid) {
      // console.log('submit', userForm)
      const res = await upload("/adminapi/user/upload", userForm);
      if (res.ActionType === "OK") {
        // console.log('进来了')
        store.commit("changeUserInfo", res.data);
        ElMessage.success("头像更新成功");
      }
    }
  });
};
</script>
<style lang="scss" scoped>
.el-row {
  margin-top: 20px;
  .box-card {
    text-align: center;
  }
}
</style>
