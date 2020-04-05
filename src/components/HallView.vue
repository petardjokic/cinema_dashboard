<template>
<div v-if="display != null">
    <b-row>
        <b-col cols="3">
            <h1>{{display.hall.name}}</h1>
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
    <b-row no-gutters v-for="(row,index) in getRows" :key="index">
            <b-col v-for="sa in getSeatsForRow(row)" :key="sa.seat.id">
                <b-card :header="sa.seat.type.name" :header-bg-variant=resolveBgColor(sa.seat.type) header-text-variant="white" style="width: 8,8rem"  class="text-center">
                    <b-card-text>Seat: {{sa.seat.column}}</b-card-text>
                    <b-card-footer footer-tag="footer" :footer=resolveFooterText(sa) :footer-text-variant=resolveFooterBg(sa)>
                    </b-card-footer>
                </b-card>
                <b-button block v-if="isFree(sa) && !isInCart(sa.seat.id)" variant="outline-success" @click="addToCart(sa.seat)">Add to cart {{isFree(sa.seat)}}</b-button>
                <b-button block v-if="isInCart(sa.seat.id)" variant="warning" @click="removeFromCart(sa.seat)">Remove</b-button>
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
        seatsAvailability() {
            return this.display.seatsAvailability
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
                    return 'IN CART'
                }
            }
            if (this.seatsAvailability != null) {
                if (sa.free === false)
                    return "TAKEN"
                return "FREE"
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
            this.$store.dispatch('removeFromCart', {
                display: this.display,
                seatId: seat.id
            })
        }
    }
}
</script>

<style>
</style>
