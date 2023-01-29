import { createStore } from 'vuex'

interface SetAnimationIdList_Type {
    type: string
    id: number
}

// 创建一个新的 store 实例
const store = createStore({
    state() {
        return {
            animationIdList: [] as number[],
            memoryManageList: [] as any[]
        }
    },
    mutations: {
        setAnimationIdList(state, { type, id }: SetAnimationIdList_Type) {
            const animationIdList = state.animationIdList
            switch (type) {
                case 'add':
                    animationIdList.push(id)
                    break;
                case 'del':
                    const index = animationIdList.findIndex(item => item === id);
                    (index >= 0) && animationIdList.splice(index, 1)
                    break;
            }
        },
        /**
         * @description: true
         * @param {*} state
         * @param {SetAnimationIdList_Type} param2
         * @return {*}
         */
        addMemoryManageList(state, obj: any) {
            const memoryManageList = state.memoryManageList
            if (obj instanceof Array) {
                memoryManageList.push(...obj)
            } else {
                memoryManageList.push(obj)
            }
        },
    }
})

export default store