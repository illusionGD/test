<template>
  <div class="home">
    home
    <nuxt-link :to="{path: '/home/child1'}">childe1</nuxt-link>
    <p>{{}}</p>
    <!-- <nuxt-link :to="{path: '/home/125', params: {id: 1234}}">id</nuxt-link> -->
    <nuxt-child/>
  </div>
</template>

<script>
import axios from 'axios'
import {mapMutations} from 'vuex';

export default {
  name: "Home",
  data() {
    return {

    }
  },
  head() {
    return {
      title: 'home'
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
    this.todo();
  },
  methods: {
    ...mapMutations(['todo']),
  }
};
</script>

<style lang="less" scoped>
.home {
  color: @commonColor
}
</style>