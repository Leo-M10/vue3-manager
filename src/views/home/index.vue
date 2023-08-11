<template>
  <div class="system_user">
    <!--    按钮区域-->
    <div class="btn">
      <div>
        <el-button :icon="CirclePlus" type="primary" @click="addUserHandler">新增</el-button>
        <el-button :icon="Edit" type="primary">编辑</el-button>
        <el-button :icon="Delete" type="primary" @click="deleteList">删除</el-button>
        <el-button :icon="Upload" type="primary">导出</el-button>
      </div>
      <div>
        <el-button type="primary" @click="resetForm(searchFormRef)">重置</el-button>
        <el-button :icon="Search" type="primary" @click="getUserListHandler">搜索</el-button>
      </div>
    </div>
  </div>

</template>

<script lang="ts" setup>

</script>

<style scoped lang="less">
.system_user {
  display: flex;
  flex-direction: column;
  position: relative;

.btn {
  margin: 10px 10px 20px 20px;
  display: flex;
  justify-content: space-between;

}

}
</style>