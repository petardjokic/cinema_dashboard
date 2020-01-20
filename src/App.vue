<template>
<div id="app">
    <Menu />
    <div class="content">
        <router-view></router-view>
    </div>
</div>
</template>

<script>
import Menu from './components/Menu.vue'
export default {
    name: 'app',
    components: {
        Menu
    }
}
</script>

<style scoped>
#app {
    height: 100%;
    width: 100%;
}
html,
body {
    height: 100%;
    width: 100%;
    
}
.content {
    margin-top: 50px;
    /* background-color: lightblue; */
}
</style>