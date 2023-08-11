<template>
  <div class="system_user">
    <!--    按钮区域-->
    <div class="btn">
      <div>
        <el-button :icon="CirclePlus" type="primary" @click="addUserHandler">新增</el-button>
        <el-button :icon="Edit" type="primary">编辑</el-button>
        <el-button :icon="Delete" type="primary" @click="deleteList">删除</el-button>
        <el-button :icon="Upload" type="primary" @click="exportUserData">导出</el-button>
      </div>
      <div>
        <el-button type="primary" @click="resetForm(searchFormRef)">重置</el-button>
        <el-button :icon="Search" type="primary" @click="getUserListHandler">搜索</el-button>
      </div>
    </div>
    <!--    搜索表单区域-->
    <div class="search">
      <el-form ref="searchFormRef" :inline="true" :model="searchForms">
        <el-form-item label="" prop="username">
          <el-input v-model="searchForms.username" clearable placeholder="用户账号" @clear="resetPage"/>
        </el-form-item>
        <el-form-item label="" prop="nickName">
          <el-input v-model="searchForms.nickName" clearable placeholder="用户昵称" @clear="resetPage"/>
        </el-form-item>
        <el-form-item label="" prop="status">
          <el-select v-model="searchForms.status" clearable placeholder="状态" style="width: 200px">
            <el-option label="启用" value="0"/>
            <el-option label="禁用" value="1"/>
          </el-select>
        </el-form-item>
        <el-form-item label="" prop="beginTime">
          <el-date-picker v-model="searchForms.beginTime" placeholder="开始日期" style="width: 200px" type="date"/>
        </el-form-item>
        <el-form-item label="" prop="endTime">
          <el-date-picker v-model="searchForms.endTime" placeholder="结束日期" style="width: 200px" type="date"/>
        </el-form-item>
      </el-form>
      <el-divider>
        <el-icon>
          <StarFilled/>
        </el-icon>
      </el-divider>
    </div>
    <!--    列表区域-->
    <div class="list">
      <el-empty v-if="parseInt(total) === 0" description="暂时没有数据"></el-empty>
      <el-table v-if="parseInt(total) !== 0" :data="userList" border stripe @selection-change="selectList">
        <el-table-column type="selection" width="40"></el-table-column>
        <el-table-column label="序号" type="index" width="60"></el-table-column>
        <el-table-column label="账号" prop="username" width="180"/>
        <el-table-column label="用户名" prop="nickName" width="180"/>
        <el-table-column label="状态" prop="status" width="70">
          <template v-slot="scope">
            <el-switch v-model.number="scope.row.status" :active-value=0 :disabled="false"
                       :inactive-value=1 active-color="#13ce66" inactive-color="#ff4949"
                       @change="changeUserStatus(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="加密盐" prop="salt" show-overflow-tooltip width="100"/>
        <el-table-column label="是否管理员" prop="isAdmin" show-overflow-tooltip width="100">
          <template v-slot="scope">
            {{ scope.row.isAdmin === 0 ? '是' : '否' }}
          </template>
        </el-table-column>
        <el-table-column label="更新时间" prop="updateTime" width="180"/>
        <el-table-column label="创建时间" prop="createTime" width="180"/>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button size="small" type="primary">重置</el-button>
            <el-button size="small" type="primary">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--      分页组件-->
      <PageBottom v-if="parseInt(total) !== 0" :pageNum="searchForms.pageNum" :pageSize="searchForms.pageSize"
                  :total="total"
                  @update:page-num="changePageNum" @update:page-size="changePageSize"></PageBottom>
    </div>
    <!--    新增用户dialog-->
    <el-dialog v-model="addUserDialog" :close-on-click-modal="false" center title="新增用户" width="60%"
               @close="resetForm(addUserFormsRef)">
      <el-form ref="addUserFormsRef" :inline="true" :model="addUserForms" :rules="addUserRules" label-width="auto"
               status-icon>
        <el-row>
          <el-col :span="8">
            <el-form-item label="账号" prop="username">
              <el-input class="input_style" v-model="addUserForms.username"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="用户名" prop="nickName">
              <el-input class="input_style" v-model="addUserForms.nickName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="管理员" prop="isAdmin">
              <el-select class="input_style" v-model="addUserForms.isAdmin" clearable placeholder="">
                <el-option label="是" value="0"/>
                <el-option label="否" value="1"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="所在地区" prop="cityId">
              <el-tree-select class="input_style" v-model="addUserForms.cityId" :data="cityList"
                              :props="{children: 'child',label: 'cityName',value: 'id'}"
                              :render-after-expand="false" check-strictly=true></el-tree-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <span>
          <el-button @click="addUserDialog = false;resetForm(addUserFormsRef)">取消</el-button>
          <el-button type="primary" @click="addUser(addUserFormsRef)">新增</el-button>
        </span>
      </template>
    </el-dialog>
  </div>

</template>

<script lang="ts" setup>
import {CirclePlus, Delete, Edit, Search, StarFilled, Upload} from '@element-plus/icons-vue'
import type {Ref} from "vue"
import {onMounted, reactive, ref} from "vue";
import {
  requestAddUser,
  requestDeleteUser,
  requestExportUser,
  requestGetCityTree,
  requestSetUserStatus,
  requestUserList
} from "@/api/user";
import type {responseType, userFormType} from "@/api/user/type";
import PageBottom from '@/layout/pageBottom/index.vue'
import type {FormInstance, FormRules} from "element-plus";
import {ElMessage, ElMessageBox} from "element-plus";


const searchForms: userFormType = reactive({
  pageNum: 1,
  pageSize: 8,
  id: '',
  username: '',
  nickName: '',
  salt: '',
  isAdmin: null,
  status: null,
  beginTime: '',
  endTime: '',
})
let searchFormRef = ref<FormInstance>()
let addUserFormsRef = ref<FormInstance>()
let userList = ref([])
let cityList = ref([])
let cityId = ref(1)
let total = ref(null)
let addUserDialog = ref(false)
let selectListData: Ref<string[]> = ref([])

const addUserForms: userFormType = reactive({
  username: '',
  nickName: '',
  isAdmin: null,
  cityId: '',
  orgId: '',
})

const usernameValid = (rule: any, value: any, callback: any) => {
  if (!value) callback(new Error('账号不能为空!'))
  if (!/^[0-9a-zA-Z]{5,12}$/.test(value)) callback(new Error('格式不正确!'))
  callback()
}
const addUserRules = reactive<FormRules>({
  username: [
    {required: true, trigger: 'blur', message: '账号不能为空!'},
    {validator: usernameValid, trigger: 'blur'},
  ],
  nickName: [
    {required: true, trigger: 'blur', message: '昵称不能为空!'},
    {min: 2, max: 10, trigger: 'blur', message: '用户名长度应在2-10个字符之间!'},
  ],
  isAdmin: [
    {required: true, trigger: 'change', message: '请选择账户身份!'}
  ]
})
onMounted(() => {

  getUserList(searchForms);
  getCityTree(cityId.value)

})
//重置页码
const resetPage = () => {
  searchForms.pageNum = 1
  searchForms.pageSize = 10
}
//重置表单
const resetForm = (formName: FormInstance | undefined) => {
  if (!formName) return
  formName.resetFields()
}
//勾选列表数据
const selectList = (selection: any[]) => {
  selectListData.value = selection.map(item => {
    return item.id
  })
}
const getUserListHandler = () => {
  resetPage()
  getUserList(searchForms)
}
//获取用户列表
const getUserList = async (data: userFormType | null) => {
  const {data: result}: responseType<any> = await requestUserList(data)
  userList.value = result.list
  total.value = result.total
}
//获取城市地区数据
const getCityTree = async (cityId: number) => {
  const {data: result}: responseType<any> = await requestGetCityTree(cityId)
  cityList.value = result
}
//页码改变触发
const changePageNum = (val: number) => {
  searchForms.pageNum = val
  getUserList(searchForms)
}
const changePageSize = (val: number) => {
  searchForms.pageSize = val
  getUserList(searchForms)
}
//修改用户状态
const changeUserStatus = async (val: userFormType) => {
  const result: responseType<any> = await requestSetUserStatus(val)
  console.log(result)
  if (result.code === 200) {
    ElMessage({
      type: "success",
      message: '状态已修改!'
    })
  } else {
    ElMessage({
      type: "warning",
      message: result.message
    })
  }
}
const addUserHandler = () => {
  addUserDialog.value = true
}
//提交新增用户表单
const addUser = async (formRef: FormInstance) => {
  if (!formRef) return
  await formRef.validate(async (valid) => {
    if (valid) {
      addUserDialog.value = false
      const result = await requestAddUser(addUserForms)
      if (result.code === 200) ElMessage({type: "success", message: '新增成功!'})
      resetForm(formRef)
      await getUserList(searchForms)
    }
  })
}
//删除选中的数据
const deleteList = async () => {
  if (selectListData.value.length === 0) return ElMessage({type: "warning", message: '请选择要删除的数据!'})
  ElMessageBox.confirm(
      '是否删除选中的数据?', '',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'info',
      }
  )
      .then(async () => {
        const result: responseType<any> = await requestDeleteUser(selectListData.value)
        if (result.code !== 200) return ElMessage({type: "error", message: '删除失败!'})
        ElMessage({type: "success", message: '删除成功!'})
        getUserListHandler()
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '已取消操作',
        })
      })

}

// 导出
const exportUserData = () => {
  requestExportUser()
}
</script>

<style lang="less" scoped>
.system_user {
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

.input_style {
  width: 200px;
}
</style>