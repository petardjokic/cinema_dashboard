<template>
<div v-if="itemData != null">
    <b-table fixed small stacked hover :items="invoice.items" caption-top>
        <template v-slot:table-caption>
            <p>Invoice ID: {{invoice.id}}</p>
            <p>Time: {{invoice.time}}</p>
            <p>Date: {{invoice.date}}</p>
        </template>
        <template v-slot:cell(seats)="data">
            <b-table fixed borderless small :items="getSeatForTable(data.item.seats)"></b-table>
        </template>
    </b-table>
</div>
</template>

<script>

export default {
    props: {
        itemData: Object
    },
    data() {
        return {
            
        }
    },
    computed: {
        invoice() {
            var computedInvoice = {}
            computedInvoice.id = this.itemData.id
            computedInvoice.time = this.itemData.startsAt
            computedInvoice.date = this.itemData.startsAt
            computedInvoice.items = []
            var displayIds = []
            displayIds = new Set(this.itemData.tickets.map(item => item.displayId))
            displayIds.forEach(displayId => {
                const item = this.itemData.tickets.find(item => item.displayId === displayId)
                const displayItems = this.itemData.tickets.filter(item => item.displayId === displayId)
                const seats = displayItems.map(item => item.seat)
                computedInvoice.items.push({
                    movie: item.movieName,
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
