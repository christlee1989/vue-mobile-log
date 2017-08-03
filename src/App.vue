<template>
    <div id="app">
        <img src="./assets/logo.png">
    </div>
</template>

<script>
    import Vue from 'vue'

    export default {
        name: 'app',
        components: {

        },
        mounted(){
            console.log(Vue.$vlog);
            let methods = {
                0:'debug',
                1:'info',
                2:'warn',
                3:'error'
            }
            for(let i=1;i<100;i++){
                this.$vlog[methods[i % 4]]('测试日志'+i)
            }
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
