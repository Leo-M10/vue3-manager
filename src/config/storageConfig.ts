interface jsonType {
    data: any,
    time: number,
    timeout: number
}
export const storage = {
    //设置localStorage过期时间,单位毫秒
    setCache(key: string,value: any,timeout: number) {
        let json:jsonType = {
            data: value,
            time: Date.now(),
            timeout: timeout
        }
        localStorage.setItem(key,JSON.stringify(json))
    },
    getCache(key: string) {
        let val:any = localStorage.getItem(key)
        if (!val) return val
        val = JSON.parse(val)
        if (Date.now() - val.time > val.timeout) {
            localStorage.removeItem(key)
            return null
        }
        return val.data
    }
}