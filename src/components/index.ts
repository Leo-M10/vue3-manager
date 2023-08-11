import SvgIcon from '@/components/SvgIcon/index.vue'
import * as ElIconModules from '@element-plus/icons-vue'
import ElIconPicker from "@/components/ElIconPicker/index.vue"
const allGlobalComponents: any = {SvgIcon,ElIconPicker}

//对外暴露插件对象
const install = (app: any) => {
    Object.keys(allGlobalComponents).forEach(key => {
        app.component(key,allGlobalComponents[key])
    })
    // 统一注册Icon图标
    for (const iconName in ElIconModules) {
        if (Reflect.has(ElIconModules, iconName)) {
            // @ts-ignore 忽略下行报错
            const item = ElIconModules[iconName]
            app.component(iconName, item)
        }
    }
}


export default install