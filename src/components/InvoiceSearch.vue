<template>
<div>
    <b-row>
        <b-col></b-col>
        <b-col cols=6>
            <b-jumbotron bg-variant="light" text-variant="white" border-variant="dark">
                <template v-slot:header>Search Invoice</template>
                <template v-slot:lead>
                    <b-form-input v-model=invoiceId @change="getInvoice" type='number' placeholder="Enter Invoice ID"></b-form-input>
                </template>
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
            this.data.id = this.data.id + 1
            console.log(this.invoiceId)
            return 0;
        }
    }
}
</script>

<style>

</style>
