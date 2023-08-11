<template>
  <div class="logo">
    <img :src="setting.logo" alt="">
    <p>{{ setting.project_title }}</p>
  </div>
  <div class="header_bar">
    <el-icon>
      <UserFilled/>
    </el-icon>
    <span>{{ store.username }}</span>
    <el-icon class="exitBtn" @click="logout">
      <SwitchButton/>
    </el-icon>
  </div>
</template>

<script lang="ts" setup>
import setting from "@/config/setting";
import {SwitchButton, UserFilled} from "@element-plus/icons-vue";
import userStore from "@/store/modules/user";
import {storeToRefs} from "pinia";
import {ElMessage, ElMessageBox} from "element-plus";

let store = userStore()
storeToRefs(store)

const logout = () => {
  ElMessageBox.confirm(
      '是否要退出当前用户?',
      '退出',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'info',
      }
  )
      .then(async () => {
        let token = store.token
        await store.userLogout(token)
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '已取消操作',
        })
      })
}
</script>

<style lang="less" scoped>
.logo {
  width: @base-menu-width;
  height: @base-top-height;
  display: flex;
  align-items: center;

  img {
    margin-left: 10px;
    margin-right: 10px;
    width: 40px;
    height: 40px;
  }

  p {
    color: white;
    font-size: 17px;
  }
}

.header_bar {
  color: #ffffff;
  margin-right: 40px;
  line-height: @base-top-height;
  font-size: 20px;
  height: @base-top-height;
  position: absolute;
  right: 0;

  .el-icon {
    vertical-align: middle;
    margin-right: 8px;
  }

  span {
    font-size: 15px;
    margin-right: 10px;
  }

  .exitBtn:hover {
    cursor: pointer;
  }

  .exitBtn:active {
    color: rgba(208, 195, 195, 0.79);
  }
}
</style>