<template>
<div class="menu">
    <b-navbar stricky="true" fixed="top" toggleable="lg" type="dark" variant="primary">
        <b-navbar-brand href="#">Cinema</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item-dropdown text="Movie">
                    <b-dropdown-item to="movie-new">New</b-dropdown-item>
                    <b-dropdown-item to="movie-search">Search</b-dropdown-item>
                </b-nav-item-dropdown>
                <b-nav-item-dropdown text="Display">
                    <b-dropdown-item to="display-new">New</b-dropdown-item>
                    <b-dropdown-item to="display-search">Search</b-dropdown-item>
                </b-nav-item-dropdown>
                <b-nav-item to="invoice">Invoice</b-nav-item>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
                <b-nav-item to="cart">Cart <b-badge variant="light">{{getCartItemsLength}}</b-badge>
                </b-nav-item>
                <b-nav-item href="#">Profile</b-nav-item>
                <b-nav-item href="#">Log out</b-nav-item>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</div>
</template>

<script>
export default {
    computed: {
        getCartItemsLength() {
            return this.$store.getters.getCartItemsLength
        }
    }
}
</script>

<style>

</style>
