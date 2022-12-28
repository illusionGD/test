import { RouteLocationRaw } from "vue-router"

export type turntable_type = {
    path: string | RouteLocationRaw,
    title: string | undefined
    x: number
    y: number
}

export type turntableList_type = Array<turntable_type>