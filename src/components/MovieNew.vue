<template>
<b-row>
    <b-col></b-col>
    <b-col cols=12>
        <b-jumbotron fluid bg-variant="primary" text-variant="white" border-variant="dark">
            <template v-slot:header>New Movie</template>
            <hr class="my-4">
            <MovieEntry :selected=selected :genres=genres :productionCompanies=productionCompanies />
            <hr>
            <b-button type="submit" variant="primary" @click="onSubmit">Submit</b-button>
            <b-button type="reset" variant="danger" @click="onReset">Reset</b-button>
        </b-jumbotron>
    </b-col>
    <b-col></b-col>
</b-row>
</template>

<script>
import axios from 'axios'
import {cinemaApi} from '../_destinations/destinations.js'
import MovieEntry from './MovieEntry.vue'
export default {
    components: {
        MovieEntry
    },
    data() {
        return {
            selected: {
                id: null,
                title: "Title generic",
                releaseYear: null,
                duration: null,
                description: 'Generic',
                genres: [],
                productionCompanies: []
            },
            genres: [],
            productionCompanies: []
        }
    },
    created() {
        console.log("Movie new created!")
        const urlGenres = axios.get(cinemaApi.BASE_URL + cinemaApi.GENRES)
        const urlProductionCompany = axios.get(cinemaApi.BASE_URL + cinemaApi.PRODUCTION_COMPANIES)
        axios.all([urlGenres, urlProductionCompany]).then(axios.spread((...responses) => {
            this.genres = responses[0].data
            this.productionCompanies = responses[1].data
        })).catch(err => {
            console.log(err)
        })
    },
    mounted() {
        console.log("Movie new mounted!")
    },
    methods: {
        onReset() {
            this.selected = {
                id: null,
                title: "Title generic",
                releaseYear: null,
                duration: null,
                description: 'Generic',
                genres: [],
                productionCompanies: []
            }
        },
        onSubmit() {
            this.selected.genres = this.selected.genres.map(genre => {
                return {id: genre}
            })
            this.selected.productionCompanies = this.selected.productionCompanies.map(productionCompany => {
                return {id: productionCompany}
            })
            axios.post(cinemaApi.BASE_URL + cinemaApi.SAVE_MOVIE, this.selected).then(response => {
                console.log(response.data)
            })
            console.log("sub")
        }
    }
}
</script>

<style>

</style>
