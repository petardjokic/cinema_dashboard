<template>
<b-row>
    <b-col></b-col>
    <b-col cols=12>
        <b-jumbotron fluid bg-variant="primary" text-variant="white" border-variant="dark">
            <template v-slot:header>New Movie</template>
            <hr class="my-4">
            <MovieNew :selected=selected />
            
        </b-jumbotron>
    </b-col>
    <b-col></b-col>
</b-row>
</template>

<script>
import axios from 'axios'
import {
    cinemaApi
} from '../_destinations/destinations.js'
import MovieNew from './MovieNew.vue'
export default {
    components: {
        MovieNew
    },
    data() {
        return {
            selected: {
                id: null,
                title: "",
                releaseYear: null,
                duration: null,
                description: '',
                genres: [],
                productionCompanies: []
            }
        }
    },
    methods: {
        onReset() {
            this.selected = {
                title: "",
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
                console.log(response.data)
            })
        }
    }
}
</script>

<style>

</style>
