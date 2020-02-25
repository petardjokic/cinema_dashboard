<template>
<div>
    <b-row>
        <b-col cols="3">
            <h1>{{hall.title}}</h1>
        </b-col>
        <b-col class="d-none d-lg-block" cols="6">
            <b-card border-variant="dark" header="CANVAS" align="center">
            </b-card>
        </b-col>
        <b-col>
            <b-row>CLASSIC: {{getSeatTypeNum(1)}}</b-row>
            <b-row>VIP: {{getSeatTypeNum(2)}}</b-row>
            <b-row>LOVE: {{getSeatTypeNum(3)}}</b-row>
        </b-col>
    </b-row>
    <p></p>
    <b-row>
    </b-row>
    <b-row v-for="(row,index) in getRows" :key="index">
            <b-card-group>
                <div v-for="seat in getSeatsForRow(row)" :key="seat.id">
                    <b-card :header="seat.seatType.name" :header-bg-variant=resolveBgColor(seatType) header-text-variant="white" style="width: 8.9rem;" class="text-center">
                        <b-card-text>Row: {{seat.row}}<br />Column: {{seat.col}}</b-card-text>
                        <b-card-footer v-if="show" footer-tag="footer" :footer=resolveFooterText(seat.id) :footer-text-variant=resolveFooterBg(seat.id)>
                        </b-card-footer>
                    </b-card>
                    <b-button v-if="show && !isTaken(seat.id) && !isInCart(seat.id)" variant="outline-success" @click="addToCart(seat)">Add to cart</b-button>
                    <b-button v-if="show && isInCart(seat.id)" variant="warning" @click="removeFromCart(seat)">Remove</b-button>
                </div>
            </b-card-group>
    </b-row>
</div>
</template>

<script>
export default {
    components: {},
    props: {
        hall: Object,
        display: Object,
        show: Boolean
    },
    computed: {
        getRows: function () {
            var mapped = this.hall.seats.map(seat => seat.row)
            return new Set(mapped)
        },
        getColumns: function () {
            var mapped = this.hall.seats.map(seat => seat.column)
            return new Set(mapped)
        },
        cart() {
            return this.$store.getters.getCart
        }
    },
    methods: {
        resolveBgColor(type) {
            if (type.id === 1) {
                return "primary"
            } else if (type.id === 2) {
                return "success"
            } else if (type.id === 3) {
                return "danger"
            } else
                return "dark"
        },
        resolveFooterText(seatId) {
            const event = this.cart.find(event => event.display.id === this.display.id)
            if (event != null) {
                const seat = event.seats.find(seat => seat.id === seatId)
                if(seat != null) {
                    return 'IN CART'
                }
            }
            if (this.display.tickets != null) {
                var filteredTickets = this.display.tickets.filter(ticket => ticket.seatId === seatId)
                if (filteredTickets.length > 0)
                    return "BUSY"
                return "FREE"
            } else {
                return "dark"
            }
        },
        resolveFooterBg(seatId) {
            const event = this.cart.find(event => event.display.id === this.display.id)
            if (event != null) {
                const seat = event.seats.find(seat => seat.id === seatId)
                if(seat != null) {
                    return 'warning'
                }
            }
            if (this.display.tickets != null) {
                var filteredTickets = this.display.tickets.filter(ticket => ticket.seatId === seatId)
                if (filteredTickets.length > 0)
                    return "danger"
                return "success"
            } else {
                return "dark"
            }
        },
        getSeatsForRow(row) {
            return this.hall.seats.filter(seat => seat.row === row)
        },
        getSeatTypeNum(type) {
            var arr = this.hall.seats.filter(seat => seat.seatType.id === type)
            return arr.length
        },
        isTaken(seatId) {
            var ret = false
            if (this.display.tickets != null) {
                var filtered = this.display.tickets.filter(ticket => ticket.seatId === seatId)
                if (filtered.length > 0)
                    ret = true
            }
            return ret
        },
        addToCart(seat) {
            this.$store.dispatch('addToCart', {
                displayId: this.display.id,
                seat: seat
            })
        },
        isInCart(seatId) {
            const event = this.cart.find(event => event.display.id === this.display.id)
            if (event != null) {
                const seat = event.seats.find(seat => seat.id === seatId)
                if (seat != null)
                    return true
            }
            return false
        },
        removeFromCart(seat) {
            this.$store.dispatch('removeFromCart', {
                displayId: this.display.id,
                seatId: seat.id
            })
        }
    }
}
</script>

<style>
</style>
