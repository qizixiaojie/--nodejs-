<template>
  <div>
    <vue-particles id="tsparticles" :particlesInit="loadFull" :particlesLoaded="particlesLoaded" :options="options" />
    <div class="formContainer">
      <h3>企业门户管理系统</h3>
      <el-form class="loginform" ref="loginFormRef" style="max-width: 600px" :model="loginForm" status-icon :rules="loginRules" label-width="auto">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username" type="text" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password" type="password" autocomplete="off" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm(loginForm)" class="submitBtn">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { loadSlim } from 'tsparticles-slim'
import { loadFull } from 'tsparticles'
import axios from 'axios'
import { ElMessage } from 'element-plus'
const loginForm = reactive({
  username: '',
  password: ''
}) //表单绑定的响应式对象
const loginFormRef = ref() //表单的引用对象
const loginRules = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { pattern: /^.{8,}$/, message: 'Password must be at least 8 characters long', trigger: 'blur' }
  ]
})
const router = useRouter()
//提交表单数据
const submitForm = () => {
  //1.校验表单
  loginFormRef.value.validate(valid => {
    if (valid) {
      axios.post('/adminapi/user/login', loginForm).then(res => {
        console.log(res.data)
        if (res.data.ActionType === 'OK') {
          console.log('asdsasda')
          ElMessage({ message: '成功登入', type: 'success' })
          //延时跳转

          router.push('/index')
        } else {
          //给出提示消息
          ElMessage.error('用户名和密码不匹配')
        }
      })
      // router.push('/index')
    }
  })
  //2.拿到表单内容，提交后台
  //3.设置token
  //localStorage.setItem("token","qizixiaojie")
}

//使用particles
const options = {
  background: {
    color: {
      value: '#FFB6C1'
    }
  },
  fpsLimit: 120,
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: 'push'
      },
      onHover: {
        enable: true,
        mode: 'repulse'
      },
      resize: true
    },
    modes: {
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.8,
        size: 40
      },
      push: {
        quantity: 4
      },
      repulse: {
        distance: 200,
        duration: 0.4
      }
    }
  },
  particles: {
    color: {
      value: '#ffffff'
    },
    links: {
      color: '#ffffff',
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1
    },
    collisions: {
      enable: true
    },
    move: {
      direction: 'none',
      enable: true,
      outModes: {
        default: 'bounce'
      },
      random: false,
      speed: 6,
      straight: false
    },
    number: {
      density: {
        enable: true,
        area: 800
      },
      value: 80
    },
    opacity: {
      value: 0.5
    },
    shape: {
      type: 'circle'
    },
    size: {
      value: { min: 1, max: 5 }
    }
  },
  detectRetina: true
}
const particlesInit = async engine => {
  //await loadFull(engine);
  await loadSlim(engine)
}
const particlesLoaded = async container => {
  console.log('Particles container loaded', container)
}
</script>
<style lang="scss" scoped>
.formContainer {
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  position: fixed;
  width: 500px;
  height: 300px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: white;
  text-align: center;
  background-color: rgb(105, 169, 199);
  h3 {
    font-size: 30px;
  }
  .loginform {
    margin-top: 30px;
  }
  .submitBtn {
    width: 100px;
    position: relative;
    margin: 0 auto;
  }
}
//深度选择
:deep .el-form-item__label {
  color: white;
}
</style>
