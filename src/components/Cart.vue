<template>
<div class="cart">
    <div v-for="display in items" :key="display.id">
        <b-table fixed borderless :fields=fields :items="display.seats" caption-top>
            <template v-slot:table-caption>{{display.movie}}, {{display.hall}} {{display.date}}</template>
            <template v-slot:cell(remove)="row">
                <b-button variant="outline-danger" size="sm" @click="removeFromCart(row.item.id, display.id)" class="mr-2">
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
            fields: ["type", "row", "col", "remove"],
            cart: [{
                display: {
                    id: 1,
                    movie: {
                        name: 'Film1'
                    },
                    hall: {
                        name: 'Hala1'
                    },
                    date: new Date()
                },
                seats: [{
                    id: 3,
                    type: {
                        name: 'VIP'
                    },
                    row: 1,
                    col: 1
                }]
            }, {
                display: {
                    id: 2,
                    movie: {
                        name: 'Film2'
                    },
                    hall: {
                        name: 'Hala2'
                    },
                    date: new Date()
                },
                seats: [{
                        id: 1,
                        type: {
                            name: 'Classic'
                        },
                        row: 2,
                        col: 2
                    },
                    {
                        id: 2,
                        type: {
                            name: 'Love'
                        },
                        row: 3,
                        col: 3
                    }
                ]
            }]
        }
    },
    computed: {
        items() {
            var mappedDisplays = []
            this.cart.forEach(event => {
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
                    movie: event.display.movie.name,
                    hall: event.display.hall.name,
                    date: event.display.date.toString().split('GMT')[0],
                    seats: seatsS
                })
            });
            return mappedDisplays
        }
    },
    methods: {
        removeFromCart(seatId, displayId) {
            const event = this.cart.find(event => event.display.id === displayId)
            event.seats = event.seats.filter(seat => seat.id !== seatId)
            this.cart = this.cart.filter(event => event.seats.length > 0)
        }
    }
}
</script>

<style>

</style>
