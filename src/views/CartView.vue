<template>
<div>
    <b-jumbotron container-fluid fluid :bg-variant=theme.BG_PRIMARY :text-variant=theme.TEXT_PRIMARY :border-variant=theme.BG_PRIMARY>
        <template v-slot:header>
            Cart
            <b-button v-if="cartLength > 0" @click="emptyCart" class='ml-5 px-5' variant='outline-danger'>Empty cart</b-button>
            </template>
                <hr class="my-4">
                <Cart v-if="cartLength > 0" @error="errorMessage" @saved="savedMessage"/>
                <p v-else>Cart is currently empty</p>
            </b-jumbotron>
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
import {
    Theme
} from '../_static/Theme'
import Cart from '../components/Cart.vue'
import Invoice from '../components/Invoice'
export default {
    components: {
        Cart,
        Invoice
    },
    data() {
        return {
            theme: Theme,
            savedInvoice: null
        }
    },
    computed: {
        cartLength() {
            return this.$store.getters.getCartItemsLength
        }
    },
    methods: {
        emptyCart() {
            this.$store.dispatch('emptyCart');
        },
        showToast(data, variant) {
            this.$bvToast.toast(data, {
                title: 'Info',
                variant: variant,
                solid: true,
                autoHideDelay: 5000,
                appendToast: false
            })
        },
        savedMessage(data) {
            this.showToast(`Invoice saved! ID: ${data}`, 'success')
            setTimeout(() => {
                this.$router.replace(`/invoices/${data}`)
            }, 1500);
        },
        errorMessage(data) {
            console.log(data)
            this.showToast(data, 'danger')
        },
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
