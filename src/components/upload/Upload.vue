<template>
  <el-form-item label="头像" prop="avatar">
    <el-upload class="avatar-uploader" action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" :show-file-list="false" :auto-upload="false" :on-change="handleChange">
      <img v-if="props.avatar" :src="uploadAvatar" class="avatar" />
      <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
    </el-upload>
  </el-form-item>
</template>

<script setup>
import { Plus } from '@element-plus/icons-vue'
import { defineEmits, defineProps, computed } from 'vue'
//每次选择图片之后的回调,显示图片
const props = defineProps({
  avatar: String
})
const emit = defineEmits(['keywinchange'])
const uploadAvatar = computed(() => (props.avatar.includes('blob') ? props.avatar : 'http://localhost:3000' + props.avatar))
const handleChange = file => {
  // // console.log(file.raw)
  // userForm.avatar = URL.createObjectURL(file.raw)
  // userForm.file = file.raw
  emit('keywinchange', file.raw)
}
</script>
<style lang="scss" scoped>
:deep .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

:deep .avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

:deep .el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
}
</style>
