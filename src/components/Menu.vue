<template>
<div>
    <b-navbar sticky fixed="top" toggleable='sm' :type=theme.TYPE :variant=theme.BG_PRIMARY>
        <b-navbar-brand to='/'>Cinema</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item-dropdown text="Movie">
                    <b-dropdown-item to="/movie-new">New</b-dropdown-item>
                    <b-dropdown-item to="/movie-search">Search</b-dropdown-item>
                </b-nav-item-dropdown>
                <b-nav-item-dropdown text="Projection">
                    <b-dropdown-item to="/display-new">New</b-dropdown-item>
                    <b-dropdown-item to="/display-search">Search</b-dropdown-item>
                </b-nav-item-dropdown>
                <b-nav-item to="/invoice">Invoice</b-nav-item>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
                <b-nav-item class='mx-5' to="/cart">Cart <b-badge variant="light">{{getCartItemsLength}}</b-badge>
                </b-nav-item>
                <!-- <b-nav-item href="#">Profile</b-nav-item> -->
                <b-nav-text class='text-light'>Petar Djokic</b-nav-text>
                <b-nav-item @click='logout' href="#">Log out</b-nav-item>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</div>
</template>

<script>
import {Theme} from '../_static/Theme'
export default {
    data() {
        return {
            theme: Theme
        }
    },
    computed: {
        getCartItemsLength() {
            return this.$store.getters.getCartItemsLength
        }
    },
    methods: {
        async logout() {
            await this.$store.dispatch('logout')
            this.$router.replace('/login')
        }
    }
}
</script>

<style>

</style>
