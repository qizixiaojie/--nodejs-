<template>
  <div class="main" v-if="hospital_data">
    <el-card
      style="width: 1200px"
      class="card"
      shadow="always"
      v-for="item in hospital_data"
      :key="item.id"
    >
      <img
        :src="`data:image/jpeg;base64,${item.logoData}`"
        alt=""
        style="width: 50px"
        v-if="item.logoData"
      />
      <span style="font-size: 24px; color: #1296db" v-else>暂无图片</span>
      <span>医院名字：{{ item.hosname }}</span>
      <span>所在地：{{ item.address }}</span>
      <span>介绍：{{ item.intro }} </span>
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
import { reqHospial_getList, reqHospial_Delete } from "@/api/hospital";
import { onMounted, ref } from "vue";
import { ElMessage } from "element-plus";

onMounted(() => {
  getData();
});

const hospital_data = ref();
const id = ref(0); //要删除的id
const dialogVisible = ref(false); //是否展示弹窗
//获取医院数据函数
const getData = async () => {
  const result = await reqHospial_getList();
  if (result.code == 200) {
    hospital_data.value = result.data;
  }
};

//触发删除函数
const detel = (itemId) => {
  dialogVisible.value = true;
  id.value = itemId;
  console.log(id.value);
};
//触发真正的删除函数
const pushData = () => {
  dialogVisible.value = false;
  ElMessage({
    message: "删除成功",
    type: "success",
  });
  reqHospial_Delete(id.value);
  setTimeout(() => {
    location.reload();
  }, 3000);
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
