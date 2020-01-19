<template>
<div class="cart">
    <div v-for="display in items" :key="display.id">
        <b-table fixed borderless :fields=fields :items="display.seats" caption-top>
            <template v-slot:table-caption>{{display.movie}}, {{display.hall}} {{display.date}}</template>
            <template v-slot:cell(remove)="row">
                <b-button variant="outline-danger" size="sm" @click="removeFromCart(display.id, row.item.id)" class="mr-2">
                    Remove
                </b-button>
            </template>
        </b-table>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            fields: ["type", "row", "col", "remove"]
        }
    },
    computed: {
        items() {
            var mappedDisplays = []
            var cart = this.$store.getters.getCart
            cart.forEach(event => {
                var seatsS = event.seats.map(seat => {
                    let obj = {}
                    obj.id = seat.id
                    obj.type = seat.type.name
                    obj.row = seat.row
                    obj.col = seat.col
                    return obj
                })
                mappedDisplays.push({
                    id: event.display.id,
                    movie: event.display.movie.title,
                    hall: event.display.hall.title,
                    date: event.display.starts_at.toString().split('GMT')[0],
                    seats: seatsS
                })
            });
            return mappedDisplays
        }
    },
    methods: {
        removeFromCart(displayId, seatId) {
            this.$store.dispatch('removeFromCart', {displayId: displayId, seatId:seatId})
            
        }
    }
}
</script>

<style>

</style>
