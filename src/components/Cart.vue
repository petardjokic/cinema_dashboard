<template>
<div>
    <div class='d-flex justify-content-center'>
        <div v-for="display in items" :key="display.id">
            <b-table responsive dark borderless fixed small :fields=fields :items="display.seats" caption-top>
                <template v-slot:table-caption>
                    <p>{{display.movie}}</p>
                    <p>{{display.hall}}</p>
                    <p>{{display.date}}</p>
                </template>
                <template v-slot:cell(remove)="row">
                    <b-button variant="outline-danger" size="sm" @click="removeFromCart(display.id, row.item.id)" class="mr-2">
                        Remove
                    </b-button>
                </template>
            </b-table>
        </div>
    </div>
    <div class='d-flex flex-column bd-highlight mb-3'>
        <b-form-input v-model="totalPrice" size='sm' class='text-center' disabled type='number' min=1 placeholder="Total price"></b-form-input>
        <b-button size='sm' class='my-2' @click="printCart" block variant='outline-success'>Order</b-button>
    </div>
</div>
</template>

<script>
import CINEMA_API from '../_static/CinemaAPI'

export default {
    data() {
        return {
            fields: ["seatType", "row", "col", "price", "remove"]
        }
    },
    computed: {
        transformedForSave() {
            return this.$store.getters.getTransformedForInvoice
        },
        totalPrice() {
            let sum = 0
            this.$store.getters.getTransformedForInvoice.forEach(element => {
                sum+= element.price
            });
            return sum
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
                    obj.price = seat.price
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
        showToast(data, variant) {
            this.$bvToast.toast(data, {
                title: 'Info',
                variant: variant,
                solid: true,
                autoHideDelay: 5000,
                appendToast: false
            })
        },
        removeFromCart(displayId, seatId) {
            this.$store.dispatch('removeFromCart', {
                displayId: displayId,
                seatId: seatId
            })
        },
        printCart() {
            let payload = {
                active: true,
                items: [...this.transformedForSave]
            }
            CINEMA_API.INVOICE.save(payload).then(response => {
                this.$emit('saved', response.data.id)
                this.$store.dispatch('emptyCart');
                    // this.showToast(`Saved! ID: ${response.data.id}`, 'success')
                
            }).catch(error => {
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
                this.$emit('error', errorMessage)
            })
        }
    }
}
</script>

<style>

</style>
