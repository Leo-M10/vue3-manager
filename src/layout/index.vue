<template>
  <div class="layout_container">
    <el-container>
      <el-header>
        <HeaderBar></HeaderBar>
      </el-header>
      <el-container>
        <el-aside>
          <AsideMenu :add-tab="addTab" :menuList="menuList"></AsideMenu>
        </el-aside>
        <el-main>
          <el-tabs v-model="activeTab" style="height: 45px" type="card" @tab-remove="removeTab" @tab-click="clickTab">
            <el-tab-pane :label="defaultTab.menuName" name="5"></el-tab-pane>
            <el-tab-pane v-for="item in tabs" :key="item.id" :label="item.menuName" :name="item.id"
                         closable></el-tab-pane>
          </el-tabs>
          <el-card class="main_content">
            <router-view></router-view>
          </el-card>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import type {Ref} from "vue"
import {onMounted, reactive, ref} from "vue";
import {requestGetMenuList} from "@/api/menu";
import AsideMenu from '@/layout/asideMenu/index.vue'
import HeaderBar from '@/layout/headerBar/index.vue'
import type {menuType} from "@/api/menu/type";
import router from "@/router";
import {storage} from "@/config/storageConfig";

onMounted(async () => {
  //监听刷新事件
  listenFlush()
  const {data: result} = await requestGetMenuList(searchMenuForm)
  menuList.value = result
  defaultTab = menuList.value[0]
  if (storage.getCache('tabs')) tabs.value = storage.getCache('tabs')
  if (storage.getCache('activeTab')) {
    activeTab.value = storage.getCache('activeTab')
  } else {
    activeTab.value = menuList.value[0].id
  }
})
// 布局页面的菜单搜索无需参数,这里只是为了兼容接口
let searchMenuForm = reactive({})

let menuList: any = ref([])
let tabs: Ref<menuType[] | any[]> = ref([])
let defaultTab: menuType | any = reactive({})
//激活tab的name
let activeTab = ref()
const removeTab = (target: string) => {
  console.log(target)
  tabs.value = tabs.value.filter(item => item.id != target)
  if (tabs.value.length === 0) {
    router.push(defaultTab.path)
    activeTab.value = defaultTab.id
    return
  }
  activeTab.value = tabs.value[tabs.value.length - 1].id
  router.push(tabs.value[tabs.value.length - 1].path)
}
const addTab = (target: any) => {
  target = JSON.parse(JSON.stringify(target))
  activeTab.value = target.id
  if (target.id === defaultTab.id) {
    return;
  }
  if (tabs.value.find(item => {
    return item.id === target.id
  })) {
    return
  }
  tabs.value.push(target)
}

const clickTab = (pane: any) => {
  let {props: active} = JSON.parse(JSON.stringify(pane))
  if (active.name === defaultTab.id) {
    return router.push(defaultTab.path)
  }
  let activeTab = tabs.value.find(item => {
    return item.id === active.name
  })
  if (activeTab) router.push(activeTab.path)
}

const listenFlush = () => {
  window.addEventListener('beforeunload', () => {
    storage.setCache('tabs', tabs.value, 1800000)
    storage.setCache('activeTab', activeTab.value, 1800000)
  })
}
</script>
<style lang="less" scoped>
.layout_container {
  width: 100%;
  height: 100vh;

  .el-header {
    //background-image: linear-gradient(135deg, #009ad6 10%, #00aa9a 100%);
    background-color: #1867c0;
    position: relative;
    width: 100vw;
    height: @base-top-height;
    top: 0;
    padding: 0;
    display: flex;

  }

  .el-aside {
    height: calc(100vh - @base-top-height);
    width: @base-menu-width;
    background-color: #e4f2fd;
    position: absolute;
    top: @base-top-height;
    padding: 0;

    .el-menu {
      border-right: 0;
      user-select: none;
    }
  }


  .el-main {
    background-color: #f7f7f7;
    height: calc(100vh - @base-top-height);
    width: calc(100vw - @base-menu-width);
    position: absolute;
    top: @base-top-height;
    left: @base-menu-width;
    padding: 10px;

    .el-tabs {
      width: 50%;
    }

    .main_content {
      height: calc(100vh - @base-top-height - 66px);
      /deep/ .el-card__body {
        padding: 5px;
      }
    }
  }

}
</style>