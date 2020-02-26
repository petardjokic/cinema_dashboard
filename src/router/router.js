import Vue from 'vue'
import VueRouter from 'vue-router'
import DisplayNewView from '../components/DisplayNewView.vue'
import MovieSearch from '../components/MovieSearch.vue'
import MovieNewView from '../components/MovieNewView.vue'
import DisplaySearch from '../components/DisplaySearch.vue'
import CartView from '../components/CartView.vue'
import InvoiceSearch from '../components/InvoiceSearch.vue'

Vue.use(VueRouter)

export const router = new VueRouter({
    mode: 'history',
    routes: [{
            path: '/movie-search',
            name: 'movieSearch',
            component: MovieSearch
        },
        {
            path: '/movie-new',
            name: 'movieNewView',
            component: MovieNewView
        },
        {
            path: '/display-new',
            name: 'DisplayNewView',
            component: DisplayNewView
        },
        {
            path: '/display-search',
            name: 'displaySearch',
            component: DisplaySearch
        },
        {
            path: '/cart',
            name: 'cart',
            component: CartView
        },
        {
            path: '/invoice',
            name: 'invoiceSearch',
            component: InvoiceSearch
        }
    ]
})