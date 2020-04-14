<template>
<div class="cart">
    <div v-for="display in items" :key="display.id">
        <b-table responsive small :fields=fields :items="display.seats" caption-top>
            <template v-slot:table-caption>{{display.movie}}, {{display.hall}} {{display.date}}</template>
            <template v-slot:cell(remove)="row">
                <b-button variant="danger" size="sm" @click="removeFromCart(display.id, row.item.id)" class="mr-2">
                    Remove
                </b-button>
            </template>
        </b-table>
    </div>
    <b-button @click="printCart" block variant='success'>Order</b-button>
</div>
</template>

<script>
import axios from 'axios'
import {
    cinemaApi
} from '../_destinations/destinations.js'

export default {
    data() {
        return {
            fields: ["seatType", "row", "col", "remove"]
        }
    },
    computed: {
        transformedForSave() {
            return this.$store.getters.getTransformedForInvoice
        },
        items() {
            var mappedDisplays = []
            var cart = this.$store.getters.getCart
            cart.forEach(event => {
                var seatsS = event.seats.map(seat => {
                    let obj = {}
                    obj.id = seat.id
                    obj.seatType = seat.type.name
                    obj.row = seat.row
                    obj.col = seat.column
                    obj._rowVariant = null
                    return obj
                })
                mappedDisplays.push({
                    id: event.display.id,
                    movie: event.display.movie.title,
                    hall: event.display.hall.name,
                    date: event.display.startsAt,
                    seats: seatsS
                })
            });
            return mappedDisplays
        }
    },
    methods: {
        removeFromCart(displayId, seatId) {
            this.$store.dispatch('removeFromCart', {
                displayId: displayId,
                seatId: seatId
            })
        },
        printCart() {
            axios.post(cinemaApi.BASE_URL + cinemaApi.INVOICES, this.transformedForSave).then(response => {
                console.log(response.data)
                this.$emit('showModal', response.data.invoice)
                this.$store.dispatch('emptyCart');
            }).catch(err => {
                console.log(err.response)
            })
        }
    }
}
</script>

<style>

</style>
