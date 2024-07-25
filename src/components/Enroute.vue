<template>
    <div class="enroute-main-view">
        <iframe :src="pdfSrc" frameborder="0"></iframe>
    </div>
</template>

<script lang='ts' setup>
import { onMounted, ref } from 'vue';
import ApiUrl from '@/config/ApiUrl';
import getCurrentNAIPCycle from '@/utils/getCurrentNAIPCycle';

const pdfSrc = ref('')

onMounted(async () => {
    const cycle = await getCurrentNAIPCycle()
    pdfSrc.value = `${ApiUrl.BaseFolder}/${cycle}/Enroute/Enroute.pdf`
})

</script>

<style lang='less' scoped>
.enroute-main-view{
    position: absolute;
    left: 0;
    top: 50px;
    width: 100%;
    height: calc(100% - 50px);
    overflow: hidden;
    iframe{
        position: relative;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    }
}
</style>