<template>
<b-jumbotron fluid container-fluid :bg-variant=theme.BG_PRIMARY :text-variant=theme.TEXT_PRIMARY :border-variant=theme.BG_PRIMARY>
    <template v-slot:header>Movie Search</template>
    <template v-slot:lead>
        Search for movies
        <div>
            <b-form @submit="searchMovies">
                <div class="my-3 d-flex justify-content-between">
                    <b-input-group class="mr-3" prepend="Title">
                        <b-form-input v-model="searchParams.title" required placeholder="Enter title"></b-form-input>
                    </b-input-group>
                    <b-button class='px-5' type="submit">Search</b-button>
                </div>
            </b-form>
        </div>
    </template>
    <hr class="my-4">
    <MovieTable :items=listMovies />
</b-jumbotron>
</template>

<script>
import {
    Theme
} from '../_static/Theme'
import CINEMA_API from '../_static/CinemaAPI'
import MovieTable from "../components/MovieTable"
export default {
    components: {
        MovieTable
    },
    data() {
        return {
            theme: Theme,
            searchParams: {
                title: ''
            },
            listMovies: []
        }
    },
    methods: {
        searchMovies(ev) {
            ev.preventDefault()
            CINEMA_API.MOVIE.search(this.searchParams).then(response => {
                this.listMovies = response.data
            }).catch(error => {
                this.listMovies = []
                let errorMessage = ''
                if (error.response) {
                    // Request made and server responded
                    console.log(error.response.data.message);
                    errorMessage = error.response.data.message
                } else if (error.request) {
                    // The request was made but no response was received
                    console.log(error.request);
                    errorMessage = 'Server is unavailable'
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                    errorMessage = `ERROR: ${error.message}`
                }
                this.showToast(errorMessage, 'danger')
            })
        },
        showToast(data, variant) {
            this.$bvToast.toast(data, {
                title: 'Info',
                variant: variant,
                solid: true,
                autoHideDelay: 5000,
                appendToast: false
            })
        },
        updateMovie(movieArg) {
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
        CINEMA_API.MOVIE.getAll().then(response => {
            this.listMovies = response.data
        }).catch(err => {
            console.log(err)
        })
    }
}
</script>

<style>

</style>
