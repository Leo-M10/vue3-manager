//统一管理用户相关的接口
import request from "@/axios/request";
import type {loginFormType, loginResultType, responseType, userFormType} from "@/api/user/type";

enum Api {
    login_Url = '/sysUser/login',
    logout_Url = '/sysUser/logout',
    userList_Url = '/sysUser/getUserList',
    setUserStatus_Url = '/sysUser/updateStatus',
    addUser_Url = '/sysUser/add',
    deleteUser_Url = '/sysUser/deleteBatch',
    exportUser_Url = '/sysUser/export',
    getCityTree_Url = 'sysUser/getCityTree',
}
//暴露请求函数
//登录函数
export const requestLogin = (data: loginFormType) => request.post<responseType<loginResultType>>(Api.login_Url,data)
//登出
export const requestLogout = (data: any) => request.get(Api.logout_Url,data)
//用户列表
export const requestUserList = (data: userFormType | null) => request.post<responseType<any>>(Api.userList_Url,data)
//修改用户状态
export const requestSetUserStatus = (data: userFormType) => request.put<responseType<any>>(`${Api.setUserStatus_Url}/${data.id}/${data.status}`)
//新增用户
export const requestAddUser = (data: userFormType) => request.post<responseType<any>>(Api.addUser_Url,data)
//删除用户
export const requestDeleteUser = (data: string[]) => request.delete<responseType<any>>(`${Api.deleteUser_Url}/${data}`)
//city树
export const requestGetCityTree = (data: number) => request.get<responseType<any>>(Api.getCityTree_Url + '?cityId=' + data)

export const requestExportUser = () => {
    request.get(Api.exportUser_Url,{responseType: 'blob',headers: {'Content-Type': 'application/json; application/octet-stream'}}).then(res=>{
        console.log('file',res)
        download(res,'用户数据.xlsx')
    })
}

const download = (res:any,name: string) => {
    if(res.size>0){ // 判断文件是否存在
        let blob = new Blob([res], { type: "application/vnd.ms-excel" });
        let url = window.URL.createObjectURL(blob);
        const link = document.createElement("a"); // 创建a标签
        link.href = url;
        link.download = name; // 重命名文件
        link.click();
        URL.revokeObjectURL(url); // 释放内存
    }
}
