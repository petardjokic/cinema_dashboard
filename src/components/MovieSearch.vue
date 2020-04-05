<template>
<b-row>
    <b-col cols=12>
        <b-jumbotron container-fluid bg-variant="primary" text-variant="white" border-variant="dark">
            <template v-slot:header>Movie Search</template>

            <template v-slot:lead>
                Search for movies
            </template>
            <hr class="my-4">  
            <MovieTable :items=listMovies @deleteMovie='removeFromList($event)' @updateMovie='updateMovie($event)'/>        
        </b-jumbotron>
        <!-- <MovieTable :items=listMovies @deleteMovie='removeFromList($event)' @updateMovie='updateMovie($event)'/> -->
    </b-col>
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
    methods: {
        updateMovie(movieArg){
            const movie = this.listMovies.find(movie => movie.id === movieArg.id)
            movie.name = movieArg.name
            movie.title = movieArg.title
            movie.trailerUri = movieArg.trailerUri
            movie.releaseYear = movieArg.releaseYear
            movie.duration = movieArg.duration
            movie.description = movieArg.description
            movie.genres = movieArg.genres
            movie.productionCompanies = movieArg.productionCompanies
        },
        removeFromList(movieId) {
            this.listMovies = this.listMovies.filter(movie => movie.id !== movieId)
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
