import request from "@/axios/request";
import type {responseType} from "@/api/user/type";
import type {menuType, menuTypeRvo} from "@/api/menu/type";

enum Api {
    getMenuList_Url = '/sysMenu/getMenuList',
    addMenu_Url = '/sysMenu/addMenu',
    deleteMenu_Url = '/sysMenu/deleteMenuByIds',
    getMenuById_Url = 'sysMenu/getMenuById',
    editMenu_Url = '/sysMenu/edit'
}
export const requestGetMenuList = (data: any) => request.post<responseType<menuType>>(Api.getMenuList_Url,data)
export const requestAddMenu = (data: menuType | any) => request.post<responseType<menuType | any>>(Api.addMenu_Url,data)
export const requestDeleteMenu = (data: string[]) => request.delete<responseType<any>>(`${Api.deleteMenu_Url}/${data}`)
export const requestGetMenuById = (data: string) => request.get<responseType<menuTypeRvo>>(`${Api.getMenuById_Url}/${data}`)
export const requestEditMenu = (data: menuType) => request.put<responseType<any>>(Api.editMenu_Url,data)