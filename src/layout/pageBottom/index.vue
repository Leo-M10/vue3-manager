<template>
  <div class="page">
    <el-pagination @current-change="changePage" @size-change="changeSize" :current-page="props.pageNum" :page-size="props.pageSize" :page-sizes="[8,15]" layout="total,prev,pager,next,sizes" :total="parseInt(props.total)" background>

    </el-pagination>
  </div>
</template>

<script lang="ts" setup>
import {ref} from "vue";

let props = defineProps(['total','pageNum','pageSize'])
let currentPage = ref(props.pageNum)
let currentSize = ref(props.pageSize)
let emit = defineEmits(['update:pageNum',"update:pageSize"])
const changePage = (val: any) => {
  currentPage.value = val
  emit('update:pageNum',parseInt(currentPage.value))
}
const changeSize = (val: any) => {
  currentSize.value = val
  emit('update:pageSize',parseInt(currentSize.value))
}
</script>

<style scoped lang="less">
.page {
  margin-top: 10px;
}
</style>