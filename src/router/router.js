import Vue from 'vue'
import VueRouter from 'vue-router'
import MovieSearch from '../components/MovieSearch.vue'
import DisplaySearch from '../components/DisplaySearch.vue'
import Cart from '../components/Cart.vue'

Vue.use(VueRouter)

export const router = new VueRouter({
    mode: 'history',
    routes: [{
        path: '/movie-search',
        name: 'movieSearch',
        component: MovieSearch
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
    }]
})

