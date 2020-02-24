<template>
<div>
<MovieEntry :selected=selected :genres=genres :productionCompanies=productionCompanies />
<hr>
<b-button type="submit" variant="primary" @click="onSubmit">Submit</b-button>
<b-button type="reset" variant="danger" @click="onReset">Reset</b-button>
</div>
</template>

<script>
import axios from 'axios'
import {
    cinemaApi
} from '../_destinations/destinations.js'
import MovieEntry from './MovieEntry.vue'
export default {
    components: {
        MovieEntry
    },
    data() {
        return {
            genres: [],
            productionCompanies: []
        }
    },
    props: {
        selected: Object
    },
    created() {
        const urlGenres = axios.get(cinemaApi.BASE_URL + cinemaApi.GENRES)
        const urlProductionCompany = axios.get(cinemaApi.BASE_URL + cinemaApi.PRODUCTION_COMPANIES)
        axios.all([urlGenres, urlProductionCompany]).then(axios.spread((...responses) => {
            this.genres = responses[0].data
            this.productionCompanies = responses[1].data
        })).catch(err => {
            //modal message and router go
            console.log("EVO GA" + err)
        })
    },
    mounted() {
        console.log("Movie new mounted!")
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
