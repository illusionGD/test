<template>
  <div class="home">
    home
    <nuxt-link :to="{path: '/home/child1'}">childe1</nuxt-link>
    <!-- <nuxt-link :to="{path: '/home/125', params: {id: 1234}}">id</nuxt-link> -->
    <nuxt-child/>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "Home",
  data() {
    return {

    }
  },
  asyncData ({params}) {
    return new Promise((resolve, reject) => {
      axios.get('https://api.sunofbeaches.com/shop/discovery/categories').then(res => {
        if (res.data) {
          resolve({dataList: res.data.data})
        } else {
          reject(new Error('error'))
        }
      }).catch(err => {
        reject(err)
      })
    })
  },
  created() {
    console.log(this.dataList)
  }
};
</script>

<style lang="less" scoped>
.home {
  color: @commonColor
}
</style>