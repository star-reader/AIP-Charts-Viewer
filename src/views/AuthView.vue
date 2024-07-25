<template>
    <div class="admin-wrapper">
        <div class="form">
            <el-form :model="form">
                <el-form-item label="请输入激活码">
                    <el-input v-model="form.code" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="activateDevice">
                        激活设备
                    </el-button>
                    </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script lang='ts' setup>
import router from '@/router';
import auth from '@/utils/auth';
import { ElMessage } from 'element-plus';
import { ref } from 'vue';
const form = ref({
    code: ''
})

async function activateDevice() {
    // const result = await auth(form.value.code)
    const result = true
    if  (result){
        //激活成功
        localStorage.setItem('auth',form.value.code)
        ElMessage.success('激活成功')
        router.push('/airport')
    }else{
        ElMessage.error('激活失败111')
    }
}


</script>

<style lang='less' scoped>
.admin-wrapper{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 980;
    background-image: linear-gradient(to bottom right, rgb(19, 32, 43), rgb(45, 120, 185));
    .form{
        position: relative;
        width: 50%;
        left: 25%;
        top: 20%;
        background-color: white;
        border-radius: 5px;
        padding: 20px;
    }
}
#app[device = 'phone'] .form{
    left: 5%;
    width: 90%;
    padding: 20px 0;
}
</style>
