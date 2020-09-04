<template>
<div>
    <div v-if=errorSignal>
        <b-alert :show=errorSignal variant="danger">{{errorMsg}}</b-alert>
    </div>
    <Invoice v-else :itemData=invoice :displays=displays @cancel=cancelInvoice />
</div>
</template>

<script>
import axios from 'axios'
import CINEMA_API from "../_static/CinemaAPI"
import Invoice from '../components/Invoice'
export default {
    components: {
        Invoice
    },
    data() {
        return {
            invoice: {
                issuedAt: new Date().toISOString(),
                items: [],
            },
            displays: [],
            errorSignal: false,
            errorMsg: ''
        }
    },
    methods: {
        showToast(data, variant) {
            this.$bvToast.toast(data, {
                title: 'Info',
                variant: variant,
                solid: true,
                autoHideDelay: 5000,
                appendToast: false
            })
        },
        cancelInvoice() {
            CINEMA_API.INVOICE.cancelById(this.invoice.id).then(response => {
                    this.invoice = response.data
                    this.showToast('Invoice canceled!', 'success')
                })
                .catch(error => {
                    console.log(error.response.data)
                    this.showToast(error.response.data.message, 'danger')
                })
        }
    },
    mounted() {
        CINEMA_API.INVOICE.getById(this.$route.params.id).then(response => {
                this.invoice = response.data
                let displayIds = new Set()
                this.invoice.items.forEach(item => displayIds.add(item.displayId))
                let displayRequests = []
                displayIds.forEach(id => {
                    displayRequests.push(CINEMA_API.DISPLAY.getById(id))
                })
                axios.all(displayRequests).then(responses => {
                    responses.forEach(response => {
                        this.displays.push(response.data)
                    })
                    console.log(this.displays)
                })
            })
            .catch(error => {
                this.errorSignal = true
                this.errorMsg = error.response.data.message
            })

    }
}
</script>

<style>

</style>
