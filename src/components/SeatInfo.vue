<template>
<div>
    
    <b-table dark small fixed :fields=fields :items=items caption-top>
        <template v-slot:table-caption>
            Category: {{display.category.name}}
        </template>
    </b-table>
</div>
</template>

<script>
export default {
    data() {
        return {
            fields: ['seat', 'price', 'ticketsLeft']
        }
    },
    props: {
        display: Object
    },
    computed: {
        prices() {
            return this.display.category.prices
        },
        seats() {
            return this.display.hall.seats
        },
        tickets() {
            return this.display.tickets
        },
        items() {
            let arr = []
            this.prices.forEach(element => {
                let typeTotal = this.seats.filter(seat => seat.type.id === element.seatType.id)
                let typeBusy = this.tickets.filter(ticket => ticket.seat.type.id === element.seatType.id)
                let ticketsLeft = typeTotal.length - typeBusy.length
                let seatInfo = {
                    seat: element.seatType.name,
                    price: element.price,
                    ticketsLeft: ticketsLeft
                }

                arr.push(seatInfo)
            });
            return arr
        }
    }
}
</script>

<style>

</style>
