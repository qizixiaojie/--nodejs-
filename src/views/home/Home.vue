<template>
  <div>Home</div>
</template>

<script setup>
import axios from 'axios'

// 使用 axios 发送 GET 请求到 "/admin/user/home"
axios.get('/adminapi/user/home').then(res => {
  console.log(res.data)
})
</script>
