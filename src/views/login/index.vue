<template>
  <div class="login_container">
    <div class="login_box">
      <div class="login_icon flex_center">
        <SvgIcon height="150px" name="login" width="150px"></SvgIcon>
      </div>
      <div class="login_form flex_center">
        <el-form ref="loginFormRef" :model="loginForm" :rules="rules" label-width="auto" status-icon
                 style="width: 300px">
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" :prefix-icon="UserFilled" placeholder="username"
                      size="large"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" :prefix-icon="Lock" placeholder="password" show-password size="large"
                      type="password"></el-input>
          </el-form-item>

          <div class="login_form_button flex_center">
            <el-button :icon="Unlock" :loading="loading" type="primary" @click="login(loginFormRef)">login</el-button>
            <el-button :icon="CircleClose" type="info" @click="resetForm(loginFormRef)">reset</el-button>
          </div>

        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, onUpdated, reactive, ref} from "vue";
import {CircleClose, Lock, Unlock, UserFilled} from "@element-plus/icons-vue"
import type {FormInstance, FormRules} from "element-plus";
import userStore from "@/store/modules/user";
import {ElMessage} from "element-plus";
import {storeToRefs} from "pinia";

let store = userStore()
storeToRefs(store)
const loginFormRef = ref<FormInstance>()
let loading = ref(false)
const loginForm = reactive({
  username: '',
  password: ''
})

const passwordValid = (rule: any,value: any,callback: any) => {
  if (!/^(?=.*\d)(?=.*[A-z])[\da-zA-Z]{6,15}$/.test(value)) callback(new Error('密码格式应为数字和字母组合6-15个字符'))
}
const rules = reactive<FormRules>({
  username: [
    {required: true, trigger: 'blur', message: '请输入账号!'},
    {min: 5, max: 15, trigger: 'blur', message: '账号长度应在5-15个字符之间!'},
    // {validator: passwordValid,trigger: 'change'},
  ],
  password: [
    {required: true, trigger: 'blur', message: '请输入密码!'},
    {min: 6,max: 12,trigger: 'blur',message: '密码长度应在6-12个字符'}
  ]
})



const login = async (form: FormInstance | undefined) => {
  if (!form) return
  await form.validate(async (valid) => {
    if (valid) {
      try {
        loading.value = true
        await store.userLogin(loginForm)
      } catch (e) {
       ElMessage({
         type: "error",
         message: (e as Error).message
       })
      } finally {
        loading.value = false
      }
    }
  })
}
//reset按钮
const resetForm = (formName: FormInstance | undefined) => {
  if (!formName) return
  formName.resetFields()
}
</script>

<style lang="less" scoped>
.login_container {
  width: 100%;
  height: 100vh;
  background: url("@/assets/images/R-C.png") no-repeat;
  background-size: cover;

  .login_box {
    height: 400px;
    width: 600px;
    background-color: #fff;
    border-radius: 10px;
    position: absolute;
    top: 50vh;
    left: 50vw;
    //opacity: 0.9;
    transform: translate(-50%, -50%);

    .login_icon {
      border-radius: 10px 10px 0 0;
      margin-top: 20px;
      margin-bottom: 10px;
    }

    .login_form {
      margin: 5px;

      .el-input:nth-child(1) {
        margin-bottom: 5px;
      }

      .login_form_button {
        margin-top: 30px;
      }
    }
  }
}

.flex_center {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>