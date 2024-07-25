<template>
  <NavBarTop />
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<script lang='ts' setup>
import axios from 'axios';
import { ElNotification } from 'element-plus';
import { onMounted } from 'vue';
import ApiUrl from './config/ApiUrl';
import NavBarTop from './layout/NavBarTop.vue';
import router from './router';
import auth from './utils/auth';

async function activateDevice() {
    const result = await auth()
    if  (!result){
        router.push('/auth')
    }
}

onMounted(() => {
  activateDevice()
  const d = localStorage.getItem('cycle')
  axios.get(ApiUrl.Available).then(res => {
    if (res.data.available !== d){
      //更新数据了
      localStorage.setItem('cycle', res.data.available)
      ElNotification.success({
        'title':`数据已更新至NAIP-${res.data.available}期！`,
        'message':'尽情使用吧~如果页面没有正确加载请尝试刷新'
      })
    }
  })
})

</script>

<style lang='less'>

#app{
  margin: 0;
  padding: 0;
  touch-action: none !important;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
  'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
}

</style>