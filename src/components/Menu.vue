<template>
<div class="menu">
    <b-navbar stricky="true" fixed="top" toggleable="lg" type="dark" variant="primary">
        <b-navbar-brand href="#">Cinema</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item href="#">Movie</b-nav-item>
                <b-nav-item href="#">Display</b-nav-item>
                <b-nav-item href="#">Ticket</b-nav-item>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
                <b-nav-item href="#">Profile</b-nav-item>
                <b-nav-item href="#">Log out</b-nav-item>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</div>
</template>

<script>
export default {

}
</script>

<style>

</style>
