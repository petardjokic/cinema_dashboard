<template>
<div>
    <b-row>
        <b-col></b-col>
        <b-col cols=6>
            <b-jumbotron bg-variant="primary" text-variant="white" border-variant="dark">
                <template v-slot:header>Search Invoice</template>
                <template v-slot:lead>
                    <b-form-input v-model=invoiceId type='number' placeholder="Enter Invoice ID"></b-form-input>
                    <b-button v-if="invoiceId.length > 0" block variant='success' @click='getInvoice'>Find</b-button>
                </template>
                <hr class="my-4">
                <div>
                    <Invoice :itemData=data @freezeInvoice='freezeInvoice()' />
                </div>
            </b-jumbotron>
        </b-col>
        <b-col></b-col>
    </b-row>
</div>
</template>

<script>
import Invoice from './Invoice.vue'
import {
    cinemaApi
} from '../_destinations/destinations.js'
import axios from 'axios'
export default {
    components: {
        Invoice
    },
    data() {
        return {
            invoiceId: '',
            data: null
        }
    },
    methods: {
        getInvoice() {
            this.data = null
            axios.get(cinemaApi.BASE_URL + cinemaApi.INVOICES_DTO + this.invoiceId).then(response => {
                console.log(response.data)
                this.data = response.data
            }).catch(err => {
                console.log(err)
            })
        },
        freezeInvoice() {
        var invoiceId = this.data.id
        const urlInvoice = cinemaApi.BASE_URL + cinemaApi.INVOICES + invoiceId
        axios.delete(urlInvoice).then(response => {
            if(response.data) {
                this.data = response.data
                console.log("Invoice freezed")
            }
        }).catch(err => {
            console.log(err)
        })
    }
    }
}
</script>

<style>

</style>
