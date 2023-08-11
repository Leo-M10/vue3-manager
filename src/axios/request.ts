/**
 * 对axios进行封装
 */
import axios from "axios";
import {ElMessage} from "element-plus";
import {storage} from "@/config/storageConfig";
//创建axios实例
let request = axios.create({

    //基础路径
    baseURL: import.meta.env.VITE_SERVER + import.meta.env.VITE_APP_BASE_API,
    timeout: 5000
});
//request实例添加拦截器
request.interceptors.request.use((config) => {
    if (storage.getCache('token')) {
        config.headers.Authorization = storage.getCache('token')
    }
    return config
})
request.interceptors.response.use(
    async response => {
        if (response.status !== 200) {
            ElMessage({
                type: 'error',
                message: response.data.message
            })
        }
        return response.data
    },
    error => {
        if (error.message === 'Network Error') return Promise.reject(error)
        //失败回调:处理http网络错误
        let message: string
        let status = error.response.status
        switch (status) {
            case 401:
                message = 'token过期'
                break;
            case 403:
                message = '无权访问'
                break;
            case 404:
                message = '请求地址错误'
                break;
            case 500:
                message = '服务器出现问题'
                break;
            default:
                message = '网络连接出现问题'
                break;
        }
        ElMessage({
            type: error,
            message
        });
        return Promise.reject(error);
    })
export default request;