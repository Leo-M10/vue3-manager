
//统一返回值类型
export interface responseType<T> {
    code: number,
    message: string,
    data: T,
    success: boolean
}

//表单查询参数类型
export interface formType {
    pageNum?: number,
    pageSize?: number,
    id?: string,
}

//登录表单参数类型
export interface loginFormType {
    username: string,
    password: string
}
//user返回类型
export interface userType {
    username: string,
    nickname: string,
    id: string
}
//带有token的user返回类型
export interface loginResultType extends userType{
    token: string
}

export interface userFormType extends formType{
    username: string,
    nickName: string,
    salt?: string,
    isAdmin?: number | null,
    cityId?: string | null,
    orgId?:String | null,
    status?: number | null,
    beginTime?: string,
    endTime?: string,
}

