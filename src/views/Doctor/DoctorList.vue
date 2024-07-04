<template>
  <div class="main" v-if="doctor_data">
    <el-card
      style="width: 1200px"
      class="card"
      shadow="always"
      v-for="item in doctor_data"
      :key="item.id"
    >
      <span>医生姓名：{{ item.name }}</span>
      <span v-if="item.sub_depname">所在部门:{{ item.sub_depname }}</span>
      <span v-else>所在部门:暂无</span>
      <span>职位： {{ item.position }}</span>
      <el-button class="delet" @click="detel(item.id)">删除</el-button>
    </el-card>
    <el-dialog v-model="dialogVisible" title="Tips" width="500">
      <span>你确定要删除这个数据吗？</span>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="pushData"> 确定 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { reqDoctor_getList, reqDoctor_delete } from "@/api/doctor";
import { onMounted, ref } from "vue";
import { ElMessage } from "element-plus";
onMounted(() => {
  getData();
});

const dialogVisible = ref(false);
const doctor_data = ref();
const id = ref(0); //要删除的id

const getData = async () => {
  const result = await reqDoctor_getList();
  console.log(result);
  if (result.code == 200) {
    doctor_data.value = result.data;
  }
};
//触发删除函数
const detel = (itemId) => {
  dialogVisible.value = true;
  id.value = itemId;
};
//触发真正的删除函数
const pushData = () => {
  dialogVisible.value = false;
  ElMessage({
    message: "删除成功",
    type: "success",
  });
  console.log(id.value);
  reqDoctor_delete(id.value);
  setTimeout(() => {
    location.reload();
  }, 1000);
};
</script>

<style scoped>
.main {
  .card {
    display: flex;
    font-size: 20px;
    margin-top: 20px;
    span {
      margin-left: 20px;
    }
    .delet {
      margin-left: 100px;
    }
  }
}
</style>
