<template>
<div id="app">

    <Menu />
    <div class="content">
        <DisplayView />
    </div>
</div>
</template>

<script>
import Menu from './components/Menu.vue'
import DisplayView from './components/DisplayView.vue'

export default {
    name: 'app',
    components: {
        Menu,
        DisplayView
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
