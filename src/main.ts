import { createApp } from 'vue'
import App from './App.vue'
import './assets/css/base.less'
//完整引入element-plus
import ElementPlus from 'element-plus'
//element-plus样式文件
import 'element-plus/dist/index.css'
//国际化配置,默认是英文,这里引入中文,必须加入下面这一行强制忽略ts的检测,因为ts没有这个文件的类型,否则无法打包
//@ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
//引入自定义插件对象:注册整个项目全局组件
import globalComponent from '@/components'
//svg需要的配置代码
import 'virtual:svg-icons-register'
import router from "@/router";
import pinia from "@/store";

const app = createApp(App)
app.use(ElementPlus,{
    //配置国际化
    locale: zhCn
})
app.use(globalComponent)
app.use(router)
app.use(pinia)
//读取多环境配置
console.log(import.meta.env)
app.mount('#app')
