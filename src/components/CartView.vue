<template>
<b-row>
    <b-col></b-col>
    <b-col cols=6>
        <b-jumbotron bg-variant="primary" text-variant="white" border-variant="dark">
            <template v-slot:header>Cart</template>
            <hr class="my-4">
            <Cart v-if="cartLength > 0" />
            <p v-else>Cart is currently empty</p>
        </b-jumbotron>
    </b-col>
    <b-col></b-col>
</b-row>
</template>

<script>
import Cart from './Cart.vue'
export default {
    components: {
        Cart
    },
    computed: {
        cartLength() {
            return this.$store.getters.getCartItemsLength
        }
    }
}
</script>

<style>

</style>
