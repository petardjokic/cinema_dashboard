<template>
<div id="app">
    <Menu />
    <div class="content">
        <DisplaySearch />
        <Cart />
    </div>
</div>
</template>

<script>
import Menu from './components/Menu.vue'
import DisplaySearch from './components/DisplaySearch.vue'
import Cart from './components/Cart.vue'

export default {
    name: 'app',
    components: {
        Menu,
        DisplaySearch,
        Cart
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
