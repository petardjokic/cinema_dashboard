import Vue from 'vue'
import VueRouter from 'vue-router'
import DisplayNew from '../components/DisplayNew.vue'
import MovieSearch from '../components/MovieSearch.vue'
import DisplaySearch from '../components/DisplaySearch.vue'
import Cart from '../components/Cart.vue'
import Invoice from '../components/Invoice.vue'

Vue.use(VueRouter)

export const router = new VueRouter({
    mode: 'history',
    routes: [{
            path: '/movie-search',
            name: 'movieSearch',
            component: MovieSearch
        },
        {
            path: '/display-new',
            name: 'DisplayNew',
            component: DisplayNew
        },
        {
            path: '/display-search',
            name: 'displaySearch',
            component: DisplaySearch
        },
        {
            path: '/cart',
            name: 'cart',
            component: Cart
        },
        {
            path: '/invoice',
            name: 'invoice',
            component: Invoice
        }
    ]
})

