<template>
<div id="app">

    <Menu />
    <div class="content">
        <MovieSearch />
    </div>
</div>
</template>

<script>
import Menu from './components/Menu.vue'
import MovieSearch from './components/MovieSearch.vue'

export default {
    name: 'app',
    components: {
        Menu,
        MovieSearch
    }
}
</script>

<style scoped>
#app {
    height: 100%;
}

html,
body {
    height: 100%;
}

.content {
    margin-top: 50px;
}
</style>
