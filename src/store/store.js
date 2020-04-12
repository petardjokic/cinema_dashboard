import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    strict: true,
    getters: {
        getCart(state) {
            return state.cart
        },
        getCartItemsLength(state) {
            var num = 0
            state.cart.forEach(event => num += event.seats.length)
            return num
        },
        getTransformedForInvoice(state) {
            var cart = {
                cartItemsUnchecked: []
            }
            state.cart.forEach(event => {
                event.seats.forEach(seat => {
                    cart.cartItemsUnchecked.push({ displayId: event.display.id, seatId: seat.id })
                })
            })
            return cart
        }
    },
    mutations: {
        removeFromCart(state, DispSeat) {
            const event = state.cart.find(event => event.display.id === DispSeat.displayId)
            event.seats = event.seats.filter(seat => seat.id !== DispSeat.seatId)
            state.cart = state.cart.filter(event => event.seats.length > 0)
        },
        addToCart(state, dispSeatObj) {
            var event = state.cart.find(event => event.display.id === dispSeatObj.display.id)
            if (event == null) {
                event = { display: dispSeatObj.display, seats: [] }
                state.cart.push(event)
            }
            event.seats.push(dispSeatObj.seat)
        }
    },
    actions: {
        removeFromCart(context, DispSeat) {
            context.commit('removeFromCart', DispSeat)
        },
        addToCart(context, DispSeatObj) {
            context.commit('addToCart', DispSeatObj)
        }
    },
    state: {
        cart: [],
    }
})