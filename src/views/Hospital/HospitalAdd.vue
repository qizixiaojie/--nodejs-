<template>
  <div>
    添加医院aaaaaa
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { reqHospial_add } from "@/api/hospital/index.js";
onMounted(()=>{
  reqHospial_add()
})
</script>

<style scoped>

</style>