<template>
<b-jumbotron fluid container-fluid :bg-variant=theme.BG_PRIMARY :text-variant=theme.TEXT_PRIMARY :border-variant=theme.BG_PRIMARY>
    <template v-slot:header>Invoice ID: <span class='px-5'>{{invoice.id}}</span></template>
    <template v-slot:lead>
        <div class="d-flex justify-content-start">
            <div class='ml-2 pr-5'>Status</div>
            <b-button disabled size='sm' class='mx-5 px-5' :variant="invoice.active ? 'outline-success': 'outline-danger'">
                {{invoice.active ? 'ACTIVE': 'CANCELED'}}
            </b-button>
            <b-button class='mx-5 px-5' v-if="invoice.active" @click="freezeInvoice" size='sm' variant='danger'>
                Cancel invoice
            </b-button>
        </div>
        <div class="ml-2 mt-3 d-flex justify-content-start">
            <span class='pr-5'>Issued At:</span><span>{{invoice.date}} @ {{invoice.time}}</span>
        </div>
        <div class="ml-2 mt-3 d-flex justify-content-start">
            <span class='pr-5'>Total price:</span><span>{{invoice.totalPrice}}</span>
        </div>
    </template>
    <div class='d-flex justify-content-center'>
    <div v-for="event in events" :key="event.id">
        <b-table responsive outlined dark borderless fixed small table-class="text-center" :fields=fields :items=event.items caption-top>
            <template v-slot:table-caption>
                <p>{{event.movie.title}}</p>
                <p>{{event.hall.name}}</p>
                <p>{{event.startsAt}}</p>
            </template>
            <template v-slot:cell(seat)="data">
                {{data.item.seat.type.name}}
            </template>
            <template v-slot:cell(row)="data">
                {{data.item.seat.row}}
            </template>
            <template v-slot:cell(column)="data">
                {{data.item.seat.column}}
            </template>
        </b-table>
    </div>
    </div>
</b-jumbotron>
</template>

<script>
import {
    Theme
} from '../_static/Theme'
export default {
    props: {
        itemData: Object,
        displays: Array
    },
    data() {
        return {
            theme: Theme,
            fields: [{
                key: 'id',
                label: 'Ticket ID'
            }, 'seat', 'row', 'column', 'price']
        }
    },
    computed: {
        invoice() {
            var computedInvoice = {}
            if (this.itemData != null) {
                computedInvoice.id = this.itemData.id
                computedInvoice.active = this.itemData.active
                computedInvoice.time = new Date(this.itemData.issuedAt).toLocaleString().split(',')[1]
                computedInvoice.date = new Date(this.itemData.issuedAt).toLocaleString().split(',')[0]
                computedInvoice.totalPrice = this.itemData.totalPrice
            }
            return computedInvoice
        },
        events() {
            let events = []
            this.displays.forEach(display => {
                let event = display
                event.items = []
                this.itemData.items
                    .filter(item => item.displayId === display.id)
                    .forEach(item => {
                        event.items.push(item)
                    })
                events.push(event)
            })
            console.log(events)
            return events
        }
    },
    methods: {
        freezeInvoice() {
            this.$emit('cancel')
        }
    }
}
</script>

<style>

</style>
