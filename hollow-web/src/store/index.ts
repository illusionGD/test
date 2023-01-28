import { createStore } from 'vuex'

interface SetAnimationIdList_Type {
    type: string
    id: number
}

// 创建一个新的 store 实例
const store = createStore({
    state() {
        return {
            animationIdList: [] as number[]
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
        }
    }
})

export default store