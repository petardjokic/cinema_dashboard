<template>
<b-jumbotron container-fluid fluid :bg-variant=theme.BG_PRIMARY :text-variant=theme.TEXT_PRIMARY :border-variant=theme.BG_PRIMARY>
    <template v-slot:header>Invoice search</template>
    <template v-slot:lead>
        Search for invoices
        <b-form @submit="searchInvoices">
            <div class="my-3 d-flex justify-content-between">
                <b-input-group class="mr-1" prepend="From">
                    <b-form-input v-model="searchParams.dateFrom" type='date' placeholder="Enter title"></b-form-input>
                </b-input-group>
                <b-input-group class="mr-1" prepend="To">
                    <b-form-input v-model="searchParams.dateTo" type='date' placeholder="Enter title"></b-form-input>
                </b-input-group>
                <b-input-group class="mr-1" prepend="Invoice ID">
                    <b-form-input v-model="searchParams.invoiceId" type='number' placeholder="Enter ID"></b-form-input>
                </b-input-group>
                <b-button class='px-5' type="submit">Search</b-button>
            </div>
        </b-form>
    </template>
    <hr class="my-4">
    <div>
        <InvoiceTable :items=listInvoices />
    </div>
</b-jumbotron>
</template>

<script>
import {
    Theme
} from '../_static/Theme'
import CINEMA_API from '../_static/CinemaAPI'
import InvoiceTable from '../components/InvoiceTable.vue'
export default {
    components: {
        InvoiceTable
    },
    data() {
        return {
            theme: Theme,
            searchParams: {
                invoiceId: null,
                dateFrom: null,
                dateTo: null,
            },
            listInvoices: []
        }
    },
    methods: {
        searchInvoices(event) {
            event.preventDefault()
            CINEMA_API.INVOICE.search(this.searchParams).then(response => {
                this.listInvoices = response.data
            }).catch(error => {
                this.listInvoices = []
                let errorMessage = ''
                if (error.response) {
                    // Request made and server responded
                    console.log(error.response.data.message);
                    errorMessage = error.response.data.message
                } else if (error.request) {
                    // The request was made but no response was received
                    console.log(error.request);
                    errorMessage = 'Server is unavailable'
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                    errorMessage = `ERROR: ${error.message}`
                }
                this.showToast(errorMessage, 'danger')
            })
        },
        showToast(data, variant) {
            this.$bvToast.toast(data, {
                title: 'Info',
                variant: variant,
                solid: true,
                autoHideDelay: 5000,
                appendToast: false
            })
        }
    },
    created() {
        CINEMA_API.INVOICE.getAll().then(response => {
            this.listInvoices = response.data
        }).catch(err => {
            console.log(err)
        })
    },
}
</script>

<style>

</style>
