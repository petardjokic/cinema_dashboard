<template>
<div v-if="itemData != null">
    <b-table fixed small stacked hover :items=events caption-top>
        <template v-slot:table-caption>
            <p>Invoice ID: {{invoice.id}}</p>
            <p>Time: {{invoice.time}}</p>
            <p>Date: {{invoice.date}}</p>
            <p>Active: {{invoice.active}}</p>
        </template>
        <template v-slot:cell(tickets)="data">
            <b-table fixed borderless small :items="data.item.tickets"></b-table>
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
            if (this.itemData != null) {
                computedInvoice.id = this.itemData.id
                computedInvoice.active = this.itemData.active
                computedInvoice.time = this.itemData.issuedAt.split('T')[1]
                computedInvoice.date = this.itemData.issuedAt.split('T')[0]
            }
            return computedInvoice
        },
        events() {
            var events = []
            if (this.itemData != null) {
                this.itemData.events.forEach(event => {
                    events.push({
                        movie: event.movie.title,
                        hall: event.hall.name,
                        time: event.startsAt.split('T')[1],
                        date: event.startsAt.split('T')[0],
                        tickets: this.transformTickets(event.tickets)
                    })
                });
            }
            return events
        }
    },
    methods: {
        transformTickets(tickets) {
            return tickets.map(ticket => {
                return {
                    row: ticket.seat.row,
                    column: ticket.seat.column,
                    type: ticket.seat.type.name
                }
            })
        }
    }
}
</script>

<style>

</style>
