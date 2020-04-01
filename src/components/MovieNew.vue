<template>
<div>
    <MovieEntry :selected=movie :genres=genres :productionCompanies=productionCompanies />
    <hr>
    <b-button type="submit" variant="primary" @click="onSubmit">Submit</b-button>
    <b-button type="reset" variant="danger" @click="onReset">Reset</b-button>
</div>
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
            movie: {},
            genres: [],
            productionCompanies: []
        }
    },
    props: {
        id: Number
    },
    created() {
        const urlMovie = axios.get(cinemaApi.BASE_URL + cinemaApi.MOVIES + this.id)
        const urlGenres = axios.get(cinemaApi.BASE_URL + cinemaApi.GENRES)
        const urlProductionCompany = axios.get(cinemaApi.BASE_URL + cinemaApi.PRODUCTION_COMPANIES)
        axios.all([urlMovie, urlGenres, urlProductionCompany]).then(axios.spread((...responses) => {
            this.movie = responses[0].data
            console.log(this.movie)
            this.genres = responses[1].data
            this.productionCompanies = responses[2].data
        })).catch(err => {
            //modal message and router go
            console.log(err)
        })
    },
    methods: {
        onReset() {
            this.selected = {
                title: '',
                releaseYear: null,
                duration: null,
                description: '',
                genres: [],
                productionCompanies: []
            }
        },
        onSubmit() {
            this.selected.genres = this.selected.genres.map(genre => {
                return {
                    id: genre
                }
            })
            this.selected.productionCompanies = this.selected.productionCompanies.map(productionCompany => {
                return {
                    id: productionCompany
                }
            })
            axios.post(cinemaApi.BASE_URL + cinemaApi.SAVE_MOVIE, this.selected).then(response => {
                this.selected = response.data
                this.$emit('movieSaved')
            })
        }
    }
}
</script>

<style>

</style>
