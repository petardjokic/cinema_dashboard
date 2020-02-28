<template>
<div>
    <b-row>
        <b-col></b-col>
        <b-col cols=6>
            <b-jumbotron bg-variant="primary" text-variant="white" border-variant="dark">
                <template v-slot:header>Search Invoice</template>
                <template v-slot:lead>
                    <b-form-input v-model=invoiceId @change="getInvoice" type='number' placeholder="Enter Invoice ID" debounce="1000"></b-form-input>
                </template>
                {{invoiceId}}
                <hr class="my-4">
                <div v-if="invoiceId != ''">
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
            data: {
                id: 2,
                time: new Date(),
                items: [{
                        displayId: 1,
                        movie: "The Sunset Limited",
                        hall: "Hall of Legends",
                        time: new Date().toLocaleString().split("GMT")[0],
                        seat: {
                            id: 13,
                            type: {
                                name: "Love"
                            },
                            row: 1,
                            col: 1
                        }
                    }, {
                        displayId: 1,
                        movie: "The Sunset Limited",
                        hall: "Hall of Legends",
                        time: new Date().toLocaleString().split("GMT")[0],
                        seat: {
                            id: 14,
                            type: {
                                name: "Love"
                            },
                            row: 2,
                            col: 2
                        },
                    },
                    {
                        displayId: 2,
                        movie: "Yolooo",
                        hall: "Wall St.",
                        time: new Date().toLocaleString().split("GMT")[0],
                        seat: {
                            id: 14,
                            type: {
                                name: "Love"
                            },
                            row: 2,
                            col: 2
                        },
                    }
                ]
            }
        }
    },
    methods: {
        getInvoice() {
            if (this.invoiceId.length == 0)
                this.data = null
            axios.get(cinemaApi.BASE_URL + cinemaApi.INVOICES + this.invoiceId).then(response => {
                console.log(response.data)
                this.data = response.data
            }).catch(err => {
                console.log(err)
            })
        }
    }
}
</script>

<style>

</style>
