<template>
<div>
    <b-row>
        <b-col></b-col>
        <b-col cols=6>
            <b-jumbotron bg-variant="primary" text-variant="white" border-variant="dark">
                <template v-slot:header>Cart</template>
                <hr class="my-4">
                <Cart v-if="cartLength > 0" @showModal=showModal />
                <p v-else>Cart is currently empty</p>
            </b-jumbotron>
        </b-col>
        <b-col></b-col>
    </b-row>
    <!-- MODALS -->
    <b-modal id="invoice-modal" hide-footer @hide=goToHomePage>
    <template v-slot:modal-title>
        Invoice saved!
    </template>
    <div class="d-block text-center">
      <Invoice :itemData=savedInvoice />
    </div>
    <!-- <b-button class="mt-3" block @click="$bvModal.hide('bv-modal-example')">Close Me</b-button> -->
  </b-modal>
</div>
</template>

<script>
import Cart from './Cart.vue'
import Invoice from './Invoice'
export default {
    components: {
        Cart,
        Invoice
    },
    data() {
        return {
            savedInvoice: null
        }
    },
    computed: {
        cartLength() {
            return this.$store.getters.getCartItemsLength
        }
    },
    methods: {
        showModal(invoiceArg) {
            this.savedInvoice = invoiceArg
            this.$bvModal.show('invoice-modal')
        },
        goToHomePage() {
            this.$router.push('/display-search')
        }
    }
}
</script>

<style>

</style>
