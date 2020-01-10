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
        <b-col cols=12>
            <b-card-group>
                <div v-for="seat in getSeatsForRow(row)" :key="seat.id">
                    <b-card :header="seat.type.name" :header-bg-variant=resolveBgColor(seat.type) header-text-variant="white" style="width: 9.75rem;" class="text-center">
                        <b-card-text>Row: {{seat.row}}<br />Column: {{seat.col}}</b-card-text>
                        <b-card-footer v-if="show" footer-tag="footer" :footer=resolveFooterText(seat.id) :footer-text-variant=resolveFooterBg(seat.id)>
                        </b-card-footer>
                    </b-card>
                    <b-button v-if="show && !isTaken(seat.id) && !isInCart(seat.id)" variant="outline-success" @click="addToCart(seat)">Add to cart</b-button>
                    <b-button v-if="isInCart(seat.id)" variant="warning" @click="removeFromCart(seat)">Remove cart</b-button>
                </div>
            </b-card-group>
        </b-col>
    </b-row>
</div>
</template>

<script>
export default {
    components: {},
    data(){
        return{
            cart: []
        }
    },
    props: {
        hall: Object,
        tickets: Array,
        show: Boolean
    },
    computed: {
        getRows: function () {
            var mapped = this.hall.seats.map(seat => seat.row)
            return new Set(mapped)
        },
        getColumns: function () {
            var mapped = this.hall.seats.map(seat => seat.col)
            return new Set(mapped)
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
            var filteredCart = this.cart.length === 0 ? [] : this.cart.filter(item => item.id === seatId) 
            if(filteredCart.length > 0) {
                return "IN CART"
            }
            if (this.tickets != null) {
                var filteredTickets = this.tickets.filter(ticket => ticket.seatId === seatId)
                if (filteredTickets.length > 0)
                    return "BUSY"
                return "FREE"
            } else {
                return "dark"
            }
        },
        resolveFooterBg(seatId) {
            var filteredCart = this.cart.length === 0 ? [] : this.cart.filter(item => item.id === seatId) 
            if(filteredCart.length > 0) {
                return "warning"
            }
            if (this.tickets != null) {
                var filtered = this.tickets.filter(ticket => ticket.seatId === seatId)
                if (filtered.length > 0)
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
            var arr = this.hall.seats.filter(seat => seat.type.id === type)
            return arr.length
        },
        isTaken(seatId) {
            var ret = false
            if (this.tickets != null) {
                var filtered = this.tickets.filter(ticket => ticket.seatId === seatId)
                if (filtered.length > 0)
                    ret = true
            }
            return ret
        },
        addToCart(seat) {
            this.cart.push(seat)
        },
        isInCart(seatId) {
            const arr = this.cart.filter(item => item.id === seatId)
            if ( arr.length > 0)
                return true
            return false
        },
        removeFromCart(seat) {
            const arr = this.cart.filter(item => item.id !== seat.id)
            this.cart = arr
        }
    }
}
</script>

<style>
</style>
