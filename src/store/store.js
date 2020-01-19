import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    strict: true,
    getters: {
        getCart(state) {
            return state.cart
        },
        getDisplays(state) {
            return state.displays
        },
        getDisplayById(state) {
            return displayId => state.displays.find(display => display.id === displayId )
        }
    },
    mutations: {
        removeFromCart(state, DispSeat) {
            const event = state.cart.find(event => event.display.id === DispSeat.displayId)
            event.seats = event.seats.filter(seat => seat.id !== DispSeat.seatId)
            state.cart = state.cart.filter(event => event.seats.length > 0)
        },
        addToCart(state, dispSeatObj) {
            var event = state.cart.find(event => event.display.id === dispSeatObj.displayId)
            if(event == null) {
                console.log('uso')
                const display = state.displays.find(display => display.id === dispSeatObj.displayId)
                event = {display: display, seats: []}
                state.cart.push(event)
            }
            event.seats.push(dispSeatObj.seat)
        }
    },
    actions: {
        removeFromCart(context, DispSeat) {
            context.commit('removeFromCart', DispSeat)
        },
        addToCart(context, DispSeatObj){
            context.commit('addToCart', DispSeatObj)
        }
    },
    state: {
        cart: [],
        displays: [{
            id: 1,
            price: {
                classic: 99.99,
                love: 149.99,
                vip: 199.99
            },
            movie: {
                id: 40,
                title: 'Trainspotting',
                duration: 120,
                year: 1995,
                description: "Ludilo mozga mozga",
                genres: [{
                        id: 1,
                        name: 'Comedy'
                    },
                    {
                        id: 2,
                        name: 'Horror'
                    }
                ],
                prodComps: [{
                        id: 1,
                        name: 'Warner Bros.'
                    },
                    {
                        id: 2,
                        name: '24H20'
                    },
                    {
                        id: 3,
                        name: 'Pop art'
                    }
                ]
            },
            hall: {
                title: 'Hall of Legends',
                seats: [{
                    id: 41,
                    type: {
                        id: 1,
                        name: 'Classic'
                    },
                    row: 1,
                    col: 1
                }, {
                    id: 51,
                    type: {
                        id: 1,
                        name: 'Classic'
                    },
                    row: 1,
                    col: 2
                }, {
                    id: 61,
                    type: {
                        id: 2,
                        name: 'VIP'
                    },
                    row: 1,
                    col: 3
                }, {
                    id: 71,
                    type: {
                        id: 2,
                        name: 'VIP'
                    },
                    row: 1,
                    col: 4
                }, {
                    id: 81,
                    type: {
                        id: 1,
                        name: 'Classic'
                    },
                    row: 1,
                    col: 5
                }, {
                    id: 91,
                    type: {
                        id: 3,
                        name: 'Love'
                    },
                    row: 1,
                    col: 6
                }, {
                    id: 101,
                    type: {
                        id: 1,
                        name: 'Classic'
                    },
                    row: 1,
                    col: 7
                }, {
                    id: 111,
                    type: {
                        id: 2,
                        name: 'VIP'
                    },
                    row: 1,
                    col: 8
                }, {
                    id: 121,
                    type: {
                        id: 2,
                        name: 'VIP'
                    },
                    row: 1,
                    col: 9
                }, {
                    id: 213,
                    type: {
                        id: 2,
                        name: 'VIP'
                    },
                    row: 1,
                    col: 10
                }, {
                    id: 214,
                    type: {
                        id: 1,
                        name: 'Classic'
                    },
                    row: 1,
                    col: 11
                }, {
                    id: 215,
                    type: {
                        id: 0,
                        name: 'Unknown'
                    },
                    row: 1,
                    col: 12
                }, {
                    id: 4,
                    type: {
                        id: 3,
                        name: 'Love'
                    },
                    row: 2,
                    col: 1
                }, {
                    id: 5,
                    type: {
                        id: 2,
                        name: 'VIP'
                    },
                    row: 2,
                    col: 2
                }, {
                    id: 6,
                    type: {
                        id: 2,
                        name: 'VIP'
                    },
                    row: 2,
                    col: 3
                }, {
                    id: 7,
                    type: {
                        id: 2,
                        name: 'VIP'
                    },
                    row: 2,
                    col: 4
                }, {
                    id: 8,
                    type: {
                        id: 2,
                        name: 'VIP'
                    },
                    row: 2,
                    col: 5
                }, {
                    id: 9,
                    type: {
                        id: 3,
                        name: 'Love'
                    },
                    row: 2,
                    col: 6
                }, {
                    id: 10,
                    type: {
                        id: 1,
                        name: 'Classic'
                    },
                    row: 2,
                    col: 7
                }, {
                    id: 11,
                    type: {
                        id: 2,
                        name: 'VIP'
                    },
                    row: 2,
                    col: 8
                }, {
                    id: 12,
                    type: {
                        id: 1,
                        name: 'Classic'
                    },
                    row: 2,
                    col: 9
                }, {
                    id: 2213,
                    type: {
                        id: 2,
                        name: 'VIP'
                    },
                    row: 2,
                    col: 10
                }, {
                    id: 14,
                    type: {
                        id: 2,
                        name: 'VIP'
                    },
                    row: 2,
                    col: 11
                }, {
                    id: 15,
                    type: {
                        id: 0,
                        name: 'Unknown'
                    },
                    row: 2,
                    col: 12
                }],
            },
            tickets: [{
                id: 1,
                seatId: 4
            }, {
                id: 2,
                seatId: 12
            }, {
                id: 3,
                seatId: 14
            }],
            starts_at: new Date(),
            ends_at: new Date()
        }]
    }
})