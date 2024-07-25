<template>
    <div class="naip-charts-wrapper">
        <div id="naip-list-aside"
        >
            <div class="top">
                <el-button @click="getChartList(true)" type="success" color="rgb(27,71,106)" :icon="Refresh" />
                <el-input v-model="filterWord" placeholder="搜索机场ICAO" />
            </div>
            <div class="select-area">
                <el-scrollbar>
                    <el-tree
                    :data="FilteredChartList"
                    node-key="id"
                    accordion
                    expand-on-click-node
                    >
                    <template #default="{ node, data }">
                        <div @click="openCharts(data)" class="naip-node-data-item" 
                        :class="data.update ? 'updated' : ''">
                            {{ node.label }}
                        </div>
                    </template>
                    </el-tree>
                    <el-result
                        v-if="!FilteredChartList.length"
                        icon="error"
                        title="暂无数据"
                        sub-title="暂无NAIP机场数据"
                    >
                    </el-result>
                </el-scrollbar>
                </div>
        </div>
        <div class="main-chart-frame">
            <iframe :src="chartSrc" frameborder="0"></iframe>
        </div>
    </div>
</template>

<script lang='ts' setup>
import { dataDecrypt } from '@/utils/crypto';
import ApiUrl from '@/config/ApiUrl';
import { onMounted, ref, watch, type Ref } from 'vue';
import axios from 'axios'
import { Refresh } from '@element-plus/icons-vue';
import getCurrentNAIPCycle from '@/utils/getCurrentNAIPCycle';
import { ElMessage } from 'element-plus';

interface NAIPChart {
    label: string,
    type: string,
    airport: string,
    path: string,
    children? : any[]
}

interface NAIPList {
    label: string,
    update: boolean,
    children: NAIPChart[]
}

const props = defineProps<{
    isAmdt: boolean
}>()

const ChartList: Ref<NAIPList[]> = ref([])
const FilteredChartList: Ref<NAIPList[]> = ref([])
const filterWord = ref('')
const AIRACcycle = ref('')

const chartSrc = ref('')

watch(filterWord , (val) => {
    FilterCharts(val)
})

function openCharts(data: NAIPChart){
    if (!data.children){
        //是图
        const airportName = ChartList.value.find(i => i.label.includes(data.airport))
        const path = `${data.airport}/${data.type === '机场细则' ? `${airportName?.label.split('(')[0].replace('/','')}.pdf` : `${data.airport}-${data.path}.pdf`}`
        const url = `${ApiUrl.BaseFolder}/${AIRACcycle.value}/Terminal/${path}`
        const src = `PDF/web/viewer.html?file=${url}`
        chartSrc.value = src
    }
    //不是图，是机场，则正常展开列表
}

function FilterCharts(word: string) {
    if (!props.isAmdt){
        FilteredChartList.value = ChartList.value.filter(i => i.label.includes(word))
    }else{
        FilteredChartList.value = ChartList.value.filter(i => i.label.includes(word) && i.update)
    }
}

function getChartList(isRefresh: boolean){
    ChartList.value = []
    FilteredChartList.value = []
    getCurrentNAIPCycle().then(res => {
        let cycle = res
        AIRACcycle.value = cycle
        axios.get(`${ApiUrl.BaseFolder}/${res}/ChartList.db`).then(r => {
            ChartList.value = JSON.parse(dataDecrypt(r.data))
            if (props.isAmdt){
                //只展示有更新的机场
                ChartList.value = ChartList.value.filter(i => i.update)
            }
            FilterCharts('')
            if (isRefresh){
                ElMessage.success('数据刷新成功')
            }
        })
    })
}

onMounted(() => {
    getChartList(false)
})

</script>

<style lang='less' scoped>
.naip-charts-wrapper{
    position: absolute;
    left: 0px;
    top: 50px;
    width: 100%;
    height: calc(100% - 50px);
    background-color: rgb(121,158,160);
    display: flex;
    z-index: 10;
    overflow: hidden;
    #naip-list-aside{
        position: relative;
        //width: 340px;
        .top{
            position: relative;
            height: 30px;
            padding: 10px;
            display: flex;
            justify-content: space-around;
            button{
                border-radius: 6px;
                font-size: 20px;
                font-weight: bold;
                margin-right: 5px;
            }
        }
        .select-area{
            position: relative;
            height: calc(100% - 50px);
            //height: 100%;
            width: 340px;
        }
    }
    .main-chart-frame{
        position: relative;
        left: 0;
        top: 0;
        padding: 0;
        margin: 0;
        width: 100%;
        height: 100%;
        background-image: url(@/assets/img/background.jpg);
        background-size: cover;
        background-position: 50%;
        iframe{
            position: relative;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
        }
    }
}

</style>
<style lang="less">
.naip-node-data-item{
    position: relative;
    margin: 10px 0;
    color: #303133;
    touch-action: none;
    &[is-airport = 'true']{
        color: rgb(24, 23, 23);
    }
    &.updated{
        color: red;
    }
}
.naip-charts-wrapper .el-tree{
    background-color: rgb(118, 148, 150);
}
.naip-charts-wrapper .el-tree-node__content{
    background-color: rgb(121,158,160);
}
.naip-charts-wrapper .el-tree-node__content:hover{
    background-color: rgb(140, 177, 179);
}
.naip-charts-wrapper .el-tree-node:focus>.el-tree-node__content{
    background-color: rgb(138, 176, 184);
}
</style>