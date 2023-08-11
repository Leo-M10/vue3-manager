<script setup lang="ts">
import {CirclePlus, Delete, Edit, Search, Upload} from "@element-plus/icons-vue";
import {reactive, ref} from "vue";
import type {FormInstance} from "element-plus";
let total = ref()
let searchFormRef = ref<FormInstance>()
let roleList = ref([])
let searchForms = reactive({

})
let addRoleForms = reactive({
  roleName: '',
  roleCode: '',
  status: null
})
</script>

<template>
  <div class="system_role">
    <!--    按钮区域-->
    <div class="btn">
      <div>
        <el-button :icon="CirclePlus" type="primary">新增</el-button>
        <el-button :icon="Edit" type="primary">编辑</el-button>
        <el-button :icon="Delete" type="primary">删除</el-button>
      </div>
      <div>
        <el-button type="primary" @click="">重置</el-button>
        <el-button :icon="Search" type="primary" @click="">搜索</el-button>
      </div>
    </div>
    <!--    搜索表单区域-->
    <div class="search">
      <el-form ref="searchFormRef" :inline="true" >
        <el-form-item label="" prop="username">
          <el-input  clearable placeholder="角色名称" @clear=""/>
        </el-form-item>
        <el-form-item label="" prop="nickName">
          <el-input clearable placeholder="角色编码" @clear=""/>
        </el-form-item>
        <el-form-item label="" prop="status">
          <el-select  clearable placeholder="状态" style="width: 200px">
            <el-option label="启用" value="0"/>
            <el-option label="禁用" value="1"/>
          </el-select>
        </el-form-item>
        <el-form-item label="" prop="beginTime">
          <el-date-picker  placeholder="开始日期" style="width: 200px" type="date"/>
        </el-form-item>
        <el-form-item label="" prop="endTime">
          <el-date-picker placeholder="结束日期" style="width: 200px" type="date"/>
        </el-form-item>
      </el-form>
      <el-divider>
        <el-icon>
          <StarFilled/>
        </el-icon>
      </el-divider>
    </div>
    <!--    列表区域-->
<!--    <div class="list">-->
<!--      <el-empty v-if="parseInt(total) === 0" description="暂时没有数据"></el-empty>-->
<!--      <el-table v-if="parseInt(total) !== 0"  border stripe @selection-change="">-->
<!--        <el-table-column type="selection" width="40"></el-table-column>-->
<!--        <el-table-column label="序号" type="index" width="60"></el-table-column>-->
<!--        <el-table-column label="账号" prop="username" width="180"/>-->
<!--        <el-table-column label="用户名" prop="nickName" width="180"/>-->
<!--        <el-table-column label="状态" prop="status" width="70">-->
<!--          <template v-slot="scope">-->

<!--          </template>-->
<!--        </el-table-column>-->
<!--        <el-table-column label="加密盐" prop="salt" show-overflow-tooltip width="100"/>-->
<!--        <el-table-column label="是否管理员" prop="isAdmin" show-overflow-tooltip width="100">-->
<!--          <template v-slot="scope">-->
<!--&lt;!&ndash;            {{ scope.row.isAdmin === 0 ? '是' : '否' }}&ndash;&gt;-->
<!--          </template>-->
<!--        </el-table-column>-->
<!--        <el-table-column label="更新时间" prop="updateTime" width="180"/>-->
<!--        <el-table-column label="创建时间" prop="createTime" width="180"/>-->
<!--        <el-table-column label="操作">-->
<!--          <template v-slot="scope">-->
<!--            <el-button size="small" type="primary">重置</el-button>-->
<!--            <el-button size="small" type="primary">查看</el-button>-->
<!--          </template>-->
<!--        </el-table-column>-->
<!--      </el-table>-->
      <!--      分页组件-->
<!--      <PageBottom v-if="parseInt(total) !== 0" :pageNum="searchForms.pageNum" :pageSize="searchForms.pageSize"-->
<!--                  :total="total"-->
<!--                  @update:page-num="changePageNum" @update:page-size="changePageSize"></PageBottom>-->
<!--    </div>-->
  </div>
</template>

<style scoped lang="less">
.system_role {
  display: flex;
  flex-direction: column;
  position: relative;

  .btn {
    margin: 10px 10px 20px 20px;
    display: flex;
    justify-content: space-between;
  }

  .search {
    margin-left: 20px;

    .el-input {
      width: 200px;
    }
  }

  .list {
    margin-left: 20px;

    .el-table {
      width: 100%;
      height: calc(100vh - 362px);
    }
  }
  /deep/ .el-dialog {
    border-radius: 20px;
  }
}
</style>