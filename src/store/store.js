import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export const store = new Vuex.Store({
    strict: true,
    plugins: [createPersistedState({
        storage: window.localStorage,
    })],
    getters: {
        isAuthenticated(state) {
            return state.user != null
        },
        getUserName(state) {
            return state.user.name
        },
        getCart(state) {
            return state.cart
        },
        getCartItemsLength(state) {
            var num = 0
            state.cart.forEach(event => num += event.seats.length)
            return num
        },
        getTransformedForInvoice(state) {
            var invoiceItems = []

            state.cart.forEach(event => {
                event.seats.forEach(seat => {
                    invoiceItems.push({
                        displayId: event.display.id,
                        price: seat.price,
                        seat: {
                            id: seat.id
                        }
                    })
                })
            })
            return invoiceItems
        }
    },
    mutations: {
        login(state, user) {
            state.user = user
        },
        async logout(state) {
            state.user = null
        },
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
            let seatPrice = event.display.category.prices.find(price => price.seatType.id === dispSeatObj.seat.type.id)
            dispSeatObj.seat.price = seatPrice.price
            event.seats.push(dispSeatObj.seat)
        },
        emptyCart(state) {
            state.cart = []
        }
    },
    actions: {
        login(context, user) {
            context.commit('login', user)
        },
        logout(context) {
            context.commit('logout')
        },
        removeFromCart(context, DispSeat) {
            context.commit('removeFromCart', DispSeat)
        },
        addToCart(context, DispSeatObj) {
            context.commit('addToCart', DispSeatObj)
        },
        emptyCart(context) {
            context.commit('emptyCart')
        }
    },
    state: {
        user: null,
        cart: [],
    }
})