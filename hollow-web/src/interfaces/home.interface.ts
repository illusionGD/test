import { RouteLocationRaw } from "vue-router"

export type turntable_type = {
    path: string | RouteLocationRaw,
    title: string | undefined
}

export type turntableList_type = Array<turntable_type>