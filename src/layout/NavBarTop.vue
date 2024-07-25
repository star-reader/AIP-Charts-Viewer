<template>
    <el-menu
        :default-active="activeBar"
        class="el-menu-demo nav-bar"
        mode="horizontal"
        background-color="rgb(37,78,107)"
        text-color="#fff"
        active-text-color="#ffd04b"
    >
    <el-menu-item @click="pathGoTo('airport')" index="airport">机场图</el-menu-item>
    <el-menu-item @click="pathGoTo('enroute')" index="enroute">航路图</el-menu-item>
    <el-menu-item @click="pathGoTo('amdt')" index="amdt">本期修订</el-menu-item>
    <el-menu-item >系统NAIP数据：{{ cycle }}</el-menu-item>
    <el-switch
      v-model="isNightMode"
      class="ml-2 night-switch"
      inline-prompt
      @change="tiggerNightMode"
      style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
      active-text="夜间模式"
      inactive-text="日间模式"
    />
  </el-menu>
</template>

<script lang='ts' setup>
import router from '@/router';
import getCurrentNAIPCycle from '@/utils/getCurrentNAIPCycle';
import { onMounted, ref } from 'vue';

const cycle = ref('')
const activeBar = 'airport'
const isNightMode = ref(false)

const pathGoTo = (to: 'airport' | 'enroute' | 'amdt') => {
    router.push(to)
}

const tiggerNightMode = (val: boolean) => {
  document.getElementById('app')?.setAttribute('night-mode',val ? 'true' : 'false')
}

onMounted(async () => {
  cycle.value = await getCurrentNAIPCycle()
})

</script>

<style lang='less'>
@height: 50px;
.nav-bar{
    position: fixed !important;
    left: 0;
    top: 0;
    height: @height;
    width: 100%;
}
.night-switch{
  height: @height !important;
}
</style>