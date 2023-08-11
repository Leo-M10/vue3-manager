<template>
  <div class="system_menu">
    <div class="btn">
      <div>
        <el-button :icon="CirclePlus" type="primary" @click="addMenuDialog = true">新增</el-button>
        <el-button :icon="Edit" type="primary" @click="getMenuHandler">编辑</el-button>
        <el-button :icon="Delete" type="primary" @click="deleteMenuHandler">删除</el-button>
      </div>
      <div>
        <el-button type="primary" @click="resetForm(searchFormRef)">重置</el-button>
        <el-button :icon="Search" type="primary" @click="getMenuListHandler">搜索</el-button>
      </div>
    </div>
    <div class="search">
      <el-form ref="searchFormRef" :inline="true" :model="searchForms">
        <el-form-item label="" prop="menuName">
          <el-input v-model="searchForms.menuName" clearable placeholder="菜单名称" @clear="resetPage"/>
        </el-form-item>
        <el-form-item label="" prop="menuType">
          <el-select v-model="searchForms.menuType" clearable placeholder="菜单类型" style="width: 200px">
            <el-option label="目录菜单" value="0"/>
            <el-option label="功能菜单" value="1"/>
            <el-option label="按钮" value="2"/>
          </el-select>
        </el-form-item>
      </el-form>
      <el-divider>
        <el-icon>
          <StarFilled/>
        </el-icon>
      </el-divider>
    </div>
    <div class="list">
      <el-empty v-if="parseInt(total) === 0" description="暂时没有数据"></el-empty>
      <el-table v-if="parseInt(total) !== 0" ref="treeTableRef" :data="menuList" :tree-props="{children: 'child'}"
                border
                row-key="id"
                stripe @select="select" @select-all="selectAll" @selection-change="changeSelection">
        <el-table-column type="selection" width="40"></el-table-column>
        <el-table-column label="菜单名称" prop="menuName" width="180"></el-table-column>
        <el-table-column label="路径" prop="path" width="180"></el-table-column>
        <el-table-column label="类型" prop="menuType" width="180">
          <template v-slot="scope">
            {{ scope.row.menuType === 0 ? '目录菜单' : scope.row.menuType === 1 ? '功能菜单' : '按钮' }}
          </template>
        </el-table-column>
        <el-table-column label="图标" prop="icon" width="80">
          <template v-slot="scope">
            <el-icon>
              <component :is="scope.row.icon"></component>
            </el-icon>
          </template>
        </el-table-column>
        <el-table-column label="更新时间" prop="updateTime" width="180"></el-table-column>
        <el-table-column label="创建时间" prop="createTime" width="180"></el-table-column>
      </el-table>
    </div>

    <!--    新增dialog-->
    <el-dialog v-model="addMenuDialog" :close-on-click-modal="false" center title="新增菜单" width="60%"
               @close="resetForm(addMenuFormsRef)" :round="true">
      <el-form ref="addMenuFormsRef" :inline="true" :model="addMenuForm" :rules="addMenuRules" label-width="auto">
        <el-row>
          <el-col :span="8">
            <el-form-item label="菜单名称" prop="menuName">
              <el-input class="input_style" v-model="addMenuForm.menuName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="路径" prop="path">
              <el-input class="input_style" v-model="addMenuForm.path"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="类型" prop="menuType">
              <el-select class="input_style" v-model="addMenuForm.menuType" clearable placeholder="">
                <el-option label="目录菜单" value="0"/>
                <el-option label="功能菜单" value="1"/>
                <el-option label="按钮" value="2"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="是否顶级" prop="flag">
              <el-select class="input_style" v-model="addMenuForm.flag" clearable placeholder="">
                <el-option label="是" value="0"/>
                <el-option label="否" value="1"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="父级菜单" prop="parentId">
              <el-tree-select class="input_style" v-model="addMenuForm.parentId" :data="menuList"
                              :disabled="!(Number(addMenuForm.flag)===1)"
                              :props="{children: 'child',label: 'menuName',value: 'id'}"
                              :render-after-expand="false" check-strictly=true></el-tree-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="图标" prop="icon">
              <ElIconPicker :icon="addMenuForm.icon" @selected="checkIcon"></ElIconPicker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <span>
          <el-button @click="addMenuDialog = false;resetForm(addMenuFormsRef)">取消</el-button>
          <el-button type="primary" @click="addMenuHandler(addMenuForm)">新增</el-button>
        </span>
      </template>
    </el-dialog>
    <!--    编辑dialog-->
    <el-dialog v-model="editMenuDialog" :close-on-click-modal="false" center title="编辑菜单" width="60%"
               @close="resetForm(editMenuFormRef)">
      <el-form ref="editMenuFormsRef" :inline="true" :model="editMenuForm" :rules="addMenuRules" label-width="auto">
        <el-row>
          <el-col :span="8">
            <el-form-item label="菜单名称" prop="menuName">
              <el-input class="input_style" v-model="editMenuForm.menuName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="路径" prop="path">
              <el-input class="input_style" v-model="editMenuForm.path"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="类型" prop="menuType">
              <el-select class="input_style" v-model="editMenuForm.menuType" clearable placeholder="">
                <el-option label="目录菜单" :value="parseInt(0)"/>
                <el-option label="功能菜单" :value="parseInt(1)"/>
                <el-option label="按钮" :value="parseInt(2)"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="父级菜单" prop="parentId">
              <el-tree-select class="input_style" v-model="editMenuForm.parentId" :data="menuList"
                              :props="{children: 'child',label: 'menuName',value: 'id'}"
                              :render-after-expand="false" check-strictly=true></el-tree-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="图标" prop="icon">
              <ElIconPicker  :icon="editMenuForm.icon" @selected="checkIcon"></ElIconPicker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <span>
          <el-button @click="editMenuDialog = false;resetForm(editMenuFormRef)">取消</el-button>
          <el-button type="primary" @click="editMenuHandler(editMenuForm)">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>

</template>

<script lang="ts" setup>
import {CirclePlus, Delete, Edit, Search, StarFilled} from '@element-plus/icons-vue'
import {onMounted, reactive, ref} from "vue";
import type {Ref} from "vue"
import {requestAddMenu, requestDeleteMenu, requestEditMenu, requestGetMenuById, requestGetMenuList} from "@/api/menu";
import type {menuType, menuTypeRvo} from "@/api/menu/type";
import type {FormInstance, FormRules} from "element-plus"
import {ElMessage, ElMessageBox, ElTreeSelect} from "element-plus";
import type {responseType} from "@/api/user/type";

onMounted(async () => {
  await getMenuList(searchForms)
})

let menuList: any = ref([])
const searchForms: menuType = reactive({
  pageNum: 1,
  pageSize: 10,
  menuName: null,
  menuType: null

})
let searchFormRef = ref<FormInstance>()
let addMenuFormsRef = ref<FormInstance>()
let editMenuFormRef = ref<FormInstance>()
let addMenuDialog = ref(false)
let editMenuDialog = ref(false)
let total: Ref<any> = ref(null)

const addMenuForm: menuType = reactive({
  menuName: null,
  menuType: null,
  path: null,
  icon: '',
  parentId: '',
  // 判断是否可以选择父级菜单
  flag: null,
})

const editMenuForm: menuTypeRvo = reactive({
  id: '',
  menuName: null,
  menuType: null,
  path: null,
  icon: '',
  parentId: '',
  parentName: ''
})

const addMenuRules = reactive<FormRules>({
  menuName: [
    {required: true, trigger: 'blur', message: '菜单名不能为空!'},
  ],
  path: [
    {required: true, trigger: 'blur', message: '路径不能为空!'},
  ],
  menuType: [
    {required: true, trigger: 'blur', message: '菜单类型不能为空!'},
  ],
  icon: [
    {required: true, trigger: 'blur', message: '请选择菜单图标!'},
  ],
  flag: [
    {required: true, trigger: 'blur', message: '请选择菜单层级!'},
  ]
})
const resetForm = (formName: FormInstance | undefined) => {
  if (!formName) return
  formName.resetFields()
  addMenuForm.icon = ''
}
const resetPage = () => {
  searchForms.pageNum = 1
  searchForms.pageSize = 10
}
const getMenuListHandler = () => {
  getMenuList(searchForms)
}
const getMenuList = async (data: menuType | null) => {
  const {data: result} = await requestGetMenuList(data)
  menuList.value = result
  total.value = menuList.value.length
}

const checkIcon = (icon: string) => {
  addMenuForm.icon = icon
}

const addMenuHandler = async (form: menuType | any) => {
  const result = await requestAddMenu(form)
  if (result.code === 200) ElMessage({type: 'success', message: '新增成功!'})
  addMenuDialog.value = false
  await getMenuList(searchForms)
}

// 表格数据多选问题
const treeTableRef: any = ref(null)
const selectSelection: any = ref([])

const select = (selection: menuType[], row: menuType) => {
  if (row.child && row.child.length > 0 && selection.find(item => item.id === row.id)) {
    row.child.forEach((item) => {
      treeTableRef.value.toggleRowSelection(item, true)
    })

  } else if (row.child && row.child.length > 0 && !selection.find(item => item.id === row.id)) {
    row.child.forEach((item) => {
      treeTableRef.value.toggleRowSelection(item, false)
    })
  }
  if (row.parentId !== '0') {
    let parent = menuList.value.find((item: menuType) => item.id === row.parentId)
    if (selection.find((item) => item.id === row.id)) return treeTableRef.value.toggleRowSelection(parent, true)
    let isCheck = parent.child.filter((item: menuType) => {
      if (selection.indexOf(item) > -1) return item
    })
    if (isCheck.length === 0) treeTableRef.value.toggleRowSelection(parent, false)
  }
}
const selectAll = (selection: menuType[]) => {
  // 过滤出有子集的菜单
  let mainMenu: menuType[] = selection.filter(item => {
    return item.child && item.child?.length > 0
  })
  if (mainMenu.length == 0) {
    //取消全选
    menuList.value.forEach((item: menuType) => {
      if (item.child && item.child?.length > 0) {
        item.child.forEach((m: menuType) => {
          treeTableRef.value.toggleRowSelection(m, false)
        })
      }
    })
    return
  }
  //根据父级状态设置子集状态
  mainMenu.forEach((menu: menuType) => {
    if (selection.find(item => item.id === menu.id)) {
      menu.child?.forEach(child => {
        treeTableRef.value.toggleRowSelection(child, true)
      })
    } else if (!selection.find(item => item.id === menu.id)) {
      menu.child?.forEach(child => {
        treeTableRef.value.toggleRowSelection(child, false)
      })
    }
  })
}
const changeSelection = (selection: menuType[]) => {
  selectSelection.value = selection
}
const deleteMenuHandler = () => {
  if (selectSelection.value.length === 0) return ElMessage({type: 'warning', message: '请选择要删除的数据!'})
  ElMessageBox.confirm(
      '是否删除选中的数据?', '',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'info',
      }
  )
      .then(async () => {
        let ids: string[] = selectSelection.value.map((item: menuType) => {
          return item.id
        })
        const result: responseType<any> = await requestDeleteMenu(ids)
        if (result.code !== 200) return ElMessage({type: 'warning', message: result.message})
        ElMessage({type: 'success', message: '删除成功!'})
        getMenuListHandler()
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '已取消操作'
        })
      })
}

const getMenuById = async (id: string) => {
  const {data: result} = await requestGetMenuById(id)
  return result
}
const getMenuHandler = async () => {
  if (selectSelection.value.length !== 1) return ElMessage({type: 'warning', message: '请选择1条要编辑的数据!'})
  editMenuDialog.value = true
  let rvo = await getMenuById(selectSelection.value[0].id)
  editMenuForm.menuName = rvo.menuName
  editMenuForm.menuType = rvo.menuType
  editMenuForm.icon = rvo.icon
  editMenuForm.path = rvo.path
  editMenuForm.id = rvo.id
  if (rvo.parentId === '0') return editMenuForm.parentId = rvo.parentName
  editMenuForm.parentId = rvo.parentId
}
const editMenuHandler = async (menu: menuType) => {
  if (menu.parentId === '顶级菜单') menu.parentId = '0'
  const result = await requestEditMenu(menu)
  editMenuDialog.value = false
  if (result.code !== 200) return ElMessage({type: 'warning', message: result.message})
  ElMessage({type: 'success', message: '编辑成功!'})
  getMenuListHandler()
}

</script>

<style lang="less" scoped>
.system_menu {
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