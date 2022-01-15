<template>
  <div>
    <el-button type="danger" plain @click="loginOut">退出</el-button>
  </div>
</template>

<script>
export default {
    methods:{
        loginOut() {
            window.sessionStorage.clear();
            this.$router.push('/login')
        }
    }
}
</script>

<style>

</style>