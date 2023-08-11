<!--面包屑-->
<template>
  <el-breadcrumb separator-icon="ArrowRight">
    <el-breadcrumb-item class="bread_color" v-for="(item,index) in $route.matched" :key="index" >
      {{item.meta.title}}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import {useRoute} from "vue-router";
let $route = useRoute()
console.log($route.matched)
</script>

<style scoped lang="less">
.el-breadcrumb {
  margin-top: 10px;
  margin-left: 10px;
  margin-bottom: 10px;
}
.bread_color /deep/ .el-breadcrumb__inner {
  font-weight: bold;
  font-size: 18px;
  color: #6b778c;

}
</style>