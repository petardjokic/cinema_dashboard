<template>
<div>
    <b-form @submit=onSubmit>
    <MovieEntry :movie=movie />
    <hr>
    <b-button block type="submit" variant="outline-light">Save</b-button>
    </b-form>
</div>
</template>

<script>
import CINEMA_API from '../_static/CinemaAPI'
import MovieEntry from './MovieEntry.vue'
export default {
    components: {
        MovieEntry
    },
    props: {
        movie: Object
    },
    computed: {
        movieGenres() {
            return this.movie.genres.map(genre => {
                return {
                    genre: genre
                }
            })
        },
        movieProductionCompanies() {
            return this.movie.productionCompanies.map(pc => {
                return {
                    productionCompany: pc
                }
            })
        }
    },
    methods: {
        onSubmit(event) {
            event.preventDefault()
            let payload = {
                ...this.movie
            }
            payload.genres = this.movieGenres
            payload.productionCompanies = this.movieProductionCompanies
            console.log(payload)
            CINEMA_API.MOVIE.save(payload).then(response => {
                    // this.movie = {}
                    this.$emit('movieSaved', response.data)
                })
                .catch(error => {
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
                    this.$emit('error', errorMessage)
                })
        }
    }
}
</script>

<style>

</style>
