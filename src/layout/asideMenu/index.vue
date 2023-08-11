<template>
  <el-menu active-text-color="#1867c0" background-color="#e4f2fd" router :default-active="$route.path">
    <template v-for="(item) in props.menuList" :key="item.id">
      <el-menu-item v-if="item.child.length===0 && item.menuType===1" :index="item.path" @click="addTab(item)">
        <el-icon>
          <component :is="item.icon"></component>
        </el-icon>
        <span>{{ item.menuName }}</span>
      </el-menu-item>
      <el-sub-menu v-if="item.menuType === 0" :key="item.id" :index="item.path">
        <template #title>
          <el-icon>
            <component :is="item.icon"></component>
          </el-icon>
          <span>{{ item.menuName }}</span>
        </template>
        <el-menu-item @click="addTab(child)" v-for="child in item.child" :key="child.id" :index="child.path">
          <el-icon>
            <component :is="child.icon"></component>
          </el-icon>
          <span>{{ child.menuName }}</span>
        </el-menu-item>
      </el-sub-menu>
    </template>
  </el-menu>

</template>

<script setup lang="ts">
let props = defineProps(['menuList','addTab'])
</script>

<style scoped lang="less">

</style>