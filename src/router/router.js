import Vue from 'vue'
import { store } from '../store/store'
import VueRouter from 'vue-router'
import DisplayNewView from '../views/DisplayNewView.vue'
import MovieSearchView from '../views/MovieSearchView.vue'
import MovieNewView from '../views/MovieNewView.vue'
import DisplaySearchView from '../views/DisplaySearchView.vue'
import CartView from '../views/CartView.vue'
import InvoiceSearchView from '../views/InvoiceSearchView.vue'
import MovieView from '../views/MovieView.vue'
import DisplayView from '../views/DisplayView.vue'
import InvoiceView from '../views/InvoiceView.vue'
import LoggedView from '../views/LoggedView.vue'
import LoginView from '../views/LoginView.vue'


Vue.use(VueRouter)

export const router = new VueRouter({
    mode: 'history',
    routes: [{
        path: '/login',
        name: 'login',
        component: LoginView
    }, {
        path: '/',
        name: 'loggedView',
        component: LoggedView,
        children: [{
                path: '/movies/:id',
                name: 'movie',
                component: MovieView
            }, {
                path: '/movie-search',
                name: 'movieSearch',
                component: MovieSearchView
            },
            {
                path: '/movie-new',
                name: 'movieNewView',
                component: MovieNewView
            },
            {
                path: '/displays/:id',
                name: 'display',
                component: DisplayView
            },
            {
                path: '/display-new',
                name: 'DisplayNewView',
                component: DisplayNewView
            },
            {
                path: '/display-search',
                name: 'displaySearch',
                component: DisplaySearchView
            },
            {
                path: '/cart',
                name: 'cart',
                component: CartView
            },
            {
                path: '/invoices/:id',
                name: 'invoice',
                component: InvoiceView
            },
            {
                path: '/invoice',
                name: 'invoiceSearch',
                component: InvoiceSearchView
            }
        ]
    }, ]
})

router.beforeEach((to, from, next) => {
    if (to.name !== 'login' && !store.getters['isAuthenticated'])
        next({ path: '/login' })
    else if (to.name === 'login' && store.getters['isAuthenticated'])
        next({ path: '/cart' })
    else
        next()
});