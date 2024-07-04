<template>
  <div class="main">
    <div class="top">
      <div>
        <span>医生管理管理</span>&nbsp;&nbsp;<span>|</span>&nbsp;&nbsp;<span
          style="font-size: 18px"
          >添加医生</span
        >
      </div>
    </div>
    <div clas="center">
      <el-card min-width="600" body-style="height:700px">
        <el-form
          label-width="auto"
          style="min-width: 700px; margin: 0 auto"
          ref="addFormRef"
          :model="addForm"
          :rules="addFormRules"
        >
          <el-form-item label="输入您的名字" prop="name">
            <el-input v-model="addForm.name" />
          </el-form-item>
          <el-form-item label="请您输入您所在的医院" prop="hosname">
            <el-input v-model="addForm.hosname" />
          </el-form-item>
          <el-form-item label="输入您的医院在那个区域" prop="address">
            <el-input v-model="addForm.address" />
          </el-form-item>
          <el-form-item label="输入您的职位" prop="position">
            <el-input v-model="addForm.position" />
          </el-form-item>
          <el-form-item label="请您输入您的部门" prop="depname">
            <el-input v-model="addForm.sub_depname" />
          </el-form-item>
          <el-form-item label="介绍一下你自己" prop="introduce">
            <el-input v-model="addForm.introduce" />
          </el-form-item>
        </el-form>
        <el-button
          style="margin-top: 100px; margin-left: 400px"
          size="large"
          type="primary"
          @click="truePush(addFormRef)"
          >确定提交</el-button
        >
        <el-button
          style="margin-top: 100px; margin-left: 200px"
          size="large"
          type="primary"
          @click="changeData(addFormRef)"
          >确定修改</el-button
        >
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { reqDoctor_add, reqDoctor_upload } from "@/api/doctor/index.js";
import { ElMessage } from "element-plus";

//定义表单实例
const addFormRef = ref();
//获取表单数据
const addForm = reactive({
  name: "", //输入姓名
  hosname: "", //输入医院
  position: "", //输入职位
  sub_depname: "", //输入部门
  introduce: "", //介绍一下你自己
});
const addFormRules = reactive({
  name: [
    { required: true, message: "请输入数据", trigger: "blur" },
    { min: 3, message: "3个字符以上", trigger: "blur" },
  ],
  hosname: [
    { required: true, message: "请输入数据", trigger: "blur" },
    { min: 1, message: "3个字符以上", trigger: "blur" },
  ],
  position: [
    { required: true, message: "请输入数据", trigger: "blur" },
    { min: 2, message: "2个字符以上", trigger: "blur" },
  ],
  sub_depname: [
    { required: true, message: "请输入数据", trigger: "blur" },
    { min: 3, message: "3个字符以上", trigger: "blur" },
  ],
  introduce: [
    { required: true, message: "请输入数据", trigger: "blur" },
    { min: 3, message: "3个字符以上", trigger: "blur" },
  ],
});
//进行确认提交
const truePush = (addFormRef) => {
  addFormRef.validate((valid) => {
    if (valid) {
      console.log(addForm);
      const result = reqDoctor_add(addForm);
      // setTimeout(() => {
      //   location.reload();
      // }, 3000);
      if (result.code == 200) {
        ElMessage({
          message: "提交成功三秒后刷新表单",
          type: "success",
        });
      }
    } else {
      console.log("error submit!");
    }
  });
};

//改变数据
const changeData = (addFormRef) => {
  addFormRef.validate((valid) => {
    if (valid) {
      console.log(addForm);
      reqDoctor_upload(addForm);

      // setTimeout(() => {
      //   location.reload();
      // }, 3000);

      ElMessage({
        message: "修改成功三秒后刷新表单",
        type: "success",
      });
    } else {
      console.log("error submit!");
    }
  });
};
</script>

<style scoped>
.main {
  .top {
    height: 60px;
    line-height: 60px;
    font-size: 14px;
    letter-spacing: 5px;
  }
  .center {
    .avatar-uploader .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
    .avatar-uploader .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }

    .avatar-uploader .el-upload:hover {
      border-color: var(--el-color-primary);
    }

    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      text-align: center;
    }
  }
}
</style>
