<template>
<div>
    <Menu />
    <div class="content">
        <router-view></router-view>
    </div>
    <!-- <Footer /> -->
</div>
</template>

<script>
import Menu from '../components/Menu'
// import Footer from '../components/Footer'
export default {
    components: {
        Menu,
        // Footer
    }

}
</script>

<style>

</style>
