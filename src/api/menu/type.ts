import type {formType} from "@/api/user/type";

export interface menuType extends formType{
    id?: string,
    menuName: string | null,
    menuType?: number | null,
    path?: string | null,
    parentId?: string | null,
    icon?: string,
    child?:Array<menuType>,
    flag?: number | null
}
export interface menuTypeRvo extends formType {
    id?: string,
    menuName?: string | null,
    menuType?: number | null,
    path?: string | null,
    parentId?: string | null,
    parentName?: string
    icon?: string,
}