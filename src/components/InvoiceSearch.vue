<template>
<div>
    <b-row>
        <b-col></b-col>
        <b-col cols=6>
            <b-jumbotron bg-variant="primary" text-variant="white" border-variant="dark">
                <template v-slot:header>Search Invoice</template>
                <template v-slot:lead>
                    <b-form-input v-model=invoiceId @change="getInvoice" type='number' placeholder="Enter Invoice ID"></b-form-input>
                </template>
                {{invoiceId}}
                <hr class="my-4">
                <div v-if="show">
                    <Invoice :itemData=data />
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
            data: null,
            show: false
        }
    },
    methods: {
        getInvoice() {
            if (this.invoiceId.length == 0)
                this.data = null
            axios.get(cinemaApi.BASE_URL + cinemaApi.INVOICES + this.invoiceId).then(response => {
                console.log(response.data)
                this.data = response.data
                this.show = true
            }).catch(err => {
                console.log(err)
            })
        }
    }
}
</script>

<style>

</style>
