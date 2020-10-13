<template>
  <div id="base">
      <tab-bar></tab-bar>
      <router-view />
  </div>
</template>

<script>

import Tabbar from '@/components/tabbar/tabbar'
export default {
  data() {
    return {
      
    }
  },
  components:{
    'tab-bar':Tabbar,
  },
  mounted() {
      
  },
}
</script>

<style>
  #base {
    height: 100%;
  }
</style>