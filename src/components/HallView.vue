<template>
<div v-if="display != null">
    <b-row>
        <b-col cols="3">
            <h1>{{display.hall.name}}</h1>
        </b-col>
        <b-col class="d-none d-lg-block" cols="6">
            <b-card border-variant="dark" header-bg-variant="secondary" header="CANVAS" align="center" no-body>
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
    <b-row no-gutters v-for="(row,index) in getRows" :key="index">
        <b-col cols=1 class='mb-2' v-for="sa in getSeatsForRow(row)" :key="sa.seat.id">
            <b-card :header="sa.seat.type.name" bg-variant="dark" :text-variant=resolveFooterBg(sa) :header-bg-variant=resolveBgColor(sa.seat.type) header-text-variant="white" class="text-center">
                Row: {{sa.seat.row}} <br /> Seat: {{sa.seat.column}}
            </b-card>
            <div v-if="status">
                <b-button block v-if="isFree(sa) && !isInCart(sa.seat.id)" variant="outline-success" @click="addToCart(sa.seat)">Add to cart</b-button>
                <b-button block v-if="isInCart(sa.seat.id)" variant="warning" @click="removeFromCart(sa.seat)">Remove</b-button>
            </div>
        </b-col>
    </b-row>
</div>
</template>

<script>
export default {
    props: {
        display: Object
    },
    computed: {
        status() {
            if (!this.display.active || new Date(this.display.startsAt) < new Date())
                return false
            return true
        },
        seatsAvailability() {
            let seats = this.display.hall.seats
            let seatsAvailability = []
            seats.forEach(seat => {
                seatsAvailability.push({
                    seat: seat,
                    free: true
                })
            });
            let tickets = this.display.tickets
            tickets.forEach(ticket => {
                let sa = seatsAvailability.find(sa => sa.seat.id == ticket.seat.id)
                sa.free = false
            })
            return seatsAvailability
        },
        getRows() {
            var mapped = this.seatsAvailability.map(sa => sa.seat.row)
            return new Set(mapped)
        },
        getColumns() {
            var mapped = this.seatsAvailability.map(sa => sa.seat.column)
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
        resolveFooterText(sa) {
            const event = this.cart.find(event => event.display.id === this.display.id)
            if (event != null) {
                const seat = event.seats.find(seat => seat.id === sa.seat.id)
                if (seat != null) {
                    return 'C'
                }
            }
            if (this.seatsAvailability != null) {
                if (sa.free === false)
                    return "T"
                return "F"
            } else {
                return "dark"
            }
        },
        resolveFooterBg(sa) {
            const event = this.cart.find(event => event.display.id === this.display.id)
            if (event != null) {
                const seat = event.seats.find(seat => seat.id === sa.seat.id)
                if (seat != null) {
                    return 'warning'
                }
            }
            if (this.seatsAvailability != null) {
                if (sa.free === false)
                    return "danger"
                return "success"
            } else {
                return "dark"
            }
        },
        getSeatsForRow(row) {
            const arr = this.seatsAvailability.filter(sa => sa.seat.row === row)
            return arr
        },
        getSeatTypeNum(type) {
            var arr = this.seatsAvailability.filter(sa => sa.seat.type.id === type)
            return arr.length
        },
        isFree(sa) {
            return sa.free
        },
        addToCart(seat) {
            this.$store.dispatch('addToCart', {
                display: this.display,
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
            let payload = {
                displayId: this.display.id,
                seatId: seat.id
            }
            this.$store.dispatch('removeFromCart', payload)
        }
    }
}
</script>

<style>
</style>
