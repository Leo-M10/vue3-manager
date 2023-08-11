<template>
  <el-popover ref="popoverRef" :width="400" placement="bottom" popper-class="popoverStyle" trigger="click">
    <template #reference>
      <el-input v-model="props.icon" style="cursor: pointer;width: 200px" placeholder="请选择图标" disabled>
        <template #prepend>
          <el-icon style="font-size: 18px">
            <component :is="props.icon"></component>
          </el-icon>
        </template>
      </el-input>
    </template>

    <div class="iconDiv">
      <ul class="fas-icon-list">
        <li v-for="(item, index) in iconList" :key="index" @click="selectedIcon(item)">
          <el-icon class="fas">
            <component :is="item"></component>
          </el-icon>
        </li>
      </ul>
    </div>


  </el-popover>
</template>

<script lang="ts" setup>
import type {Ref} from "vue"
import {onMounted, ref} from "vue";
import * as ElIcons from "@element-plus/icons-vue"

const emit = defineEmits(['selected'])
let props = defineProps(['icon'])
let name = ref(props.icon)
let iconList: Ref<String[]> = ref([])
const popoverRef: any = ref(null)

onMounted(() => {
  for (let iconName in ElIcons) {
    iconList.value.push(iconName)
  }
})

const selectedIcon = (names: string) => {
  name.value = names
  console.log(popoverRef)
  popoverRef.value?.hide()
  emit('selected', names)
}

</script>

<style lang="less">
.el-popover.popoverStyle {
  height: 300px;
  overflow: auto;
}

.iconDiv {
  margin-top: 10px;

  ul li {
    margin: 10px 10px;
    float: left;

    .el-icon {
      cursor: pointer;
      font-size: 20px;
    }
  }
}

//.ui-fas {
//  height: 300px;
//  overflow: hidden;
//
//  .inputIcon {
//    width: 100%;
//    height: 30px;
//    margin-bottom: 10px;
//
//    .fas-icon-list {
//      height: 100%;
//      overflow: scroll;
//      .fas {
//        font-size: 20px;
//        color: #1989fa;
//        cursor: pointer;
//      }
//    }
//
//    .fas-icon-list li {
//      float: left;
//      margin: 10px 10px;
//    }
//  }
//}


</style>