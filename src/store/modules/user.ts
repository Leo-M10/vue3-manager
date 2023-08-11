// 用户相关的小仓库
import {defineStore} from "pinia";
import type {loginFormType, loginResultType, responseType} from "@/api/user/type";
import {requestLogin, requestLogout} from "@/api/user";
import {ref} from "vue";
import router from "@/router";
import {ElMessage} from "element-plus";
import {storage} from "@/config/storageConfig";

let userStore = defineStore('user', () => {

    let token = ref(storage.getCache('token'))
    let username = ref(storage.getCache('username'))

    return {
        token,username,
        async userLogin(user: loginFormType) {
            const result: responseType<loginResultType> = await requestLogin(user);
            if (result.code === 200) {
                localStorage.clear()
                token.value = result.data.token
                storage.setCache('token',result.data.token,1800000)
                username.value = result.data.username
                storage.setCache('username', result.data.username,1800000)
                await router.push('/home')
                ElMessage({
                    type: "success",
                    message: '登录成功!'
                })
                return
            }
        },
        async userLogout(token: string | null) {
            const result: any = await requestLogout(token)
            if (result.code === 200) {
                await router.push('/login')
                localStorage.clear()
                ElMessage({
                    type: 'success',
                    message: '已退出当前用户!',
                })
                return
            }
            await router.push('/login')

        }
    }
})

export default userStore;