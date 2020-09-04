import axios from 'axios';

const CinemaAPIPaths = {
    BASE_URL: 'http://192.168.182.122:8087/api/',
    GENRES: 'genres/',
    PRODUCTION_COMPANIES: 'productionCompanies/',
    MOVIES: 'movies/',
    DISPLAYS: 'displays/',
    HALLS: 'halls/',
    INVOICES: 'invoices/',
    CATEGORIES: 'categories/',
    LOGIN: 'auth/login/'
}

export default {
    login: function(payload) {
        const url = CinemaAPIPaths.BASE_URL + CinemaAPIPaths.LOGIN
        return axios.post(url, payload)
    },
    MOVIE: {
        MoviesUrl: CinemaAPIPaths.BASE_URL + CinemaAPIPaths.MOVIES,
        getById: function(payload) {
            const url = this.MoviesUrl + payload
            console.log(url)
            return axios.get(url)
        },
        getGenresById: function(payload) {
            const url = `${this.MoviesUrl}${payload}/genres`
            console.log(url)
            return axios.get(url)
        },
        getProductionCompaniesById: function(payload) {
            const url = `${this.MoviesUrl}${payload}/productionCompanies`
            console.log(url)
            return axios.get(url)
        },
        getAll: function() {
            const url = this.MoviesUrl
            console.log(url)
            return axios.get(url)
        },
        search: function(payload) {
            const url = this.MoviesUrl + 'search'
            console.log(url)
            return axios.post(url, payload)
        },
        save: function(payload) {
            const url = this.MoviesUrl
            console.log(url)
            return axios.post(url, payload)
        },
        deleteById: function(payload) {
            const url = this.MoviesUrl + payload
            console.log(url)
            return axios.delete(url)
        }
    },
    GENRE: {
        GenresUrl: CinemaAPIPaths.BASE_URL + CinemaAPIPaths.GENRES,
        getAll: function() {
            const url = this.GenresUrl
            console.log(url)
            return axios.get(url)
        }
    },
    PRODUCTION_COMPANY: {
        productionCompanyUrl: CinemaAPIPaths.BASE_URL + CinemaAPIPaths.PRODUCTION_COMPANIES,
        getAll: function() {
            const url = this.productionCompanyUrl
            console.log(url)
            return axios.get(url)
        },
    },
    DISPLAY: {
        displayUrl: CinemaAPIPaths.BASE_URL + CinemaAPIPaths.DISPLAYS,
        getById: function(payload) {
            const url = this.displayUrl + payload
            console.log(url)
            return axios.get(url)
        },
        getAll: function() {
            const url = this.displayUrl
            console.log(url)
            return axios.get(url)
        },
        save: function(payload) {
            const url = this.displayUrl
            console.log(url)
            return axios.post(url, payload)
        },
        search: function(payload) {
            const url = this.displayUrl + 'search'
            console.log(url)
            return axios.post(url, payload)
        },
        cancelById: function(payload) {
            const url = this.displayUrl + payload
            console.log(url)
            return axios.delete(url)
        },
    },
    HALL: {
        hallUrl: CinemaAPIPaths.BASE_URL + CinemaAPIPaths.HALLS,
        getAll: function() {
            const url = this.hallUrl
            console.log(url)
            return axios.get(url)
        },
    },
    CATEGORY: {
        categoryUrl: CinemaAPIPaths.BASE_URL + CinemaAPIPaths.CATEGORIES,
        getAll: function() {
            const url = this.categoryUrl
            console.log(url)
            return axios.get(url)
        },
    },
    INVOICE: {
        invoiceUrl: CinemaAPIPaths.BASE_URL + CinemaAPIPaths.INVOICES,
        getById: function(payload) {
            const url = this.invoiceUrl + payload
            console.log(url)
            return axios.get(url)
        },
        getAll: function() {
            const url = this.invoiceUrl
            console.log(url)
            return axios.get(url)
        },
        save: function(payload) {
            const url = this.invoiceUrl
            console.log(url)
            return axios.post(url, payload)
        },
        search: function(payload) {
            const url = this.invoiceUrl + 'search'
            console.log(url)
            return axios.post(url, payload)
        },
        cancelById: function(payload) {
            const url = this.invoiceUrl + payload
            console.log(url)
            return axios.delete(url)
        },
    }
}