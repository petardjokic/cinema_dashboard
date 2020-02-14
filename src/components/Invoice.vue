<template>
<div>
    <b-table fixed stacked hover :items="invoice.items" caption-top>
        <template v-slot:table-caption>
            Invoice ID: {{invoice.id}} Time: {{invoice.time.toLocaleTimeString()}} Date: {{invoice.time.toLocaleDateString()}}
        </template>
        <template v-slot:cell(seats)="data">
            <!-- <div v-for="(seat,index) in data.item.seats" :key="index">
                <span><strong>Row:</strong> {{seat.row}} Column: {{seat.col}} Type: {{seat.type.name}}</span>
            </div> -->
            <b-table fixed borderless small :items="getSeatForTable(data.item.seats)"></b-table>
        </template>
    </b-table>
</div>
</template>

<script>
export default {
    data() {
        return {
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
                }]
            }
        }
    },
    computed: {
        invoice() {
            var computedInvoice = {}
            computedInvoice.id = this.data.invoice
            computedInvoice.time = this.data.time
            computedInvoice.items = []
            var displayIds = []
            displayIds = new Set(this.data.items.map(item => item.displayId))
            displayIds.forEach(displayId => {
                const item = this.data.items.find(item => item.displayId === displayId)
                const displayItems = this.data.items.filter(item => item.displayId === displayId)
                const seats = displayItems.map(item => item.seat)
                computedInvoice.items.push({
                    movie: item.movie,
                    hall: item.hall,
                    time: item.time,
                    seats: seats
                })
            });
            return computedInvoice
        }
    },
    methods: {
        getSeatForTable(seats) {
            return seats.map(seat => {
                return {
                    row: seat.row,
                    column: seat.col,
                    type: seat.type.name
                }
            })
        }
    }
}
</script>

<style>

</style>
