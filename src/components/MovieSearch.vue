<template>
<b-row>
    <b-col></b-col>
    <b-col cols=12>
        <b-jumbotron fluid bg-variant="primary" text-variant="white" border-variant="dark">
            <template v-slot:header>Movie Search</template>

            <template v-slot:lead>
                This is a simple hero unit, a simple jumbotron-style component for calling extra attention to
                featured content or information.
            </template>

            <hr class="my-4">          
        </b-jumbotron>
        <MovieTable :items= listMovies />
    </b-col>
    <b-col></b-col>
</b-row>
</template>

<script>
import axios from 'axios'
import {cinemaApi} from '../_destinations/destinations.js'
import MovieTable from "./MovieTable"
export default {
    components: {
        MovieTable
    },
    data() {
        return {
            searchParams: { 
            },
            listMovies: []
        }
    },
    created() {
        const urlMovies = cinemaApi.BASE_URL + cinemaApi.MOVIES
        axios.get(urlMovies).then(response => {
            this.listMovies = response.data
        }).catch(err => {
            console.log(err)
        })
    }
}
</script>

<style>

</style>
