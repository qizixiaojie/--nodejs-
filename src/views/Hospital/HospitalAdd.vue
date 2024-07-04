<template>
  <div class="main">
    <div class="top">
      <div>
        <span>医院管理</span>&nbsp;&nbsp;<span>|</span>&nbsp;&nbsp;<span
          style="font-size: 18px"
          >添加医院</span
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
          <el-form-item label="输入您的医院名字" prop="hosname">
            <el-input v-model="addForm.hosname" />
          </el-form-item>
          <el-form-item label="请您输入医院等级" prop="hostype">
            <el-select-v2
              v-model="addForm.hostype"
              placeholder="请选择您医院等级"
              :options="options"
            />
          </el-form-item>
          <el-form-item label="输入您的医院在那个区域" prop="address">
            <el-input v-model="addForm.address" />
          </el-form-item>
          <el-form-item label="输入您的医院所在的城市编码" prop="cityCode">
            <el-input v-model="addForm.cityCode" />
          </el-form-item>
          <el-form-item label="请您的介绍一下你的医院" prop="intro">
            <el-input v-model="addForm.intro" />
          </el-form-item>
          <el-form-item label="输入您医院每天放号时间" prop="daily_release_time">
            <el-time-picker
              v-model="addForm.daily_release_time"
              aria-label="Pick a time"
              placeholder="Pick a time"
              style="width: 100%"
            />
          </el-form-item>
          <el-form-item label="添加医院图片" prop="logoData">
            <el-upload
              class="avatar-uploader"
              :show-file-list="false"
              :before-upload="beforeAvatarUpload"
              :after-upload="changeAvatarUpload"
              :http-request="uploadImageFile"
              style="border: 1px solid #eee"
            >
              <img v-if="imgLizi" :src="imgLizi" class="avatar" width="150px" />
              <el-icon v-else class="avatar-uploader-icon" size="100"><Plus /></el-icon>
            </el-upload>
          </el-form-item>
        </el-form>
        <el-button
          style="margin-top: 100px; margin-left: 600px"
          size="large"
          type="primary"
          @click="truePush(addFormRef)"
          >确定提交</el-button
        >
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { Plus } from "@element-plus/icons-vue";
import { reqHospial_add } from "@/api/hospital/index.js";
import { ElMessage } from "element-plus";
//定义等级数据
const options = Array.from({ length: 3 }).map((_, idx) => ({
  value: `${idx + 1}`,
  label: `${idx + 1}`,
}));
const imgLizi = ref(require("../../assets/user_上传图片.jpg"));
//定义表单实例
const addFormRef = ref();
//获取表单数据
const addForm = reactive({
  hosname: "",
  hostype: "",
  address: "",
  cityCode: "",
  intro: "",
  daily_release_time: "",
  logoData: "",
});
const addFormRules = reactive({
  hosname: [
    { required: true, message: "请输入数据", trigger: "blur" },
    { min: 3, message: "3个字符以上", trigger: "blur" },
  ],
  hostype: [
    { required: true, message: "请输入数据", trigger: "blur" },
    { min: 1, message: "3个字符以上", trigger: "blur" },
  ],
  address: [
    { required: true, message: "请输入数据", trigger: "blur" },
    { min: 3, message: "3个字符以上", trigger: "blur" },
  ],
  cityCode: [
    { required: true, message: "请输入数据", trigger: "blur" },
    { min: 3, message: "3个字符以上", trigger: "blur" },
  ],
  intro: [
    { required: true, message: "请输入数据aaaaaaa", trigger: "blur" },
    { min: 3, message: "3个字符以上", trigger: "blur" },
  ],
  daily_release_time: [{ required: true }],
});

//上传图片的操作
//处理传入数据过大
const logoData = ref();
const uploadImageFile = (options) => {
  let that = this;
  let file = options.file;
  addForm.logoData = URL.createObjectURL(file);
  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = function () {
    // 将文件（file）转换成base64字符串
    imgLizi.value = reader.result;
    addForm.logoData = reader.result.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
  };
};
const beforeAvatarUpload = (rawFile) => {
  if (rawFile.type !== "image/jpeg") {
    this.$msgbox.alert("请上传JPEG格式的图片文件!");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    this.$msgbox.alert("封面图片的大小请小于2MB!");
    return false;
  }

  return true;
};
// 改变图片
const changeAvatarUpload = () => {
  console.log(addForm.logoData);
};
//进行确认提交
const truePush = (addFormRef) => {
  addFormRef.validate((valid) => {
    if (valid) {
      addForm.logoData = "";
      const result = reqHospial_add(addForm);
      if (result.code == 200) {
        ElMessage({
          message: "提交成功三秒后刷新表单",
          type: "success",
        });
        setTimeout(() => {
          location.reload();
        }, 3000);
      }
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
