<template>
<div>
    <div v-if=errorSignal>
        <b-alert :show=errorSignal variant="danger">{{errorMsg}}</b-alert>
    </div>
    <Movie v-else :movie=movie @delete=deleteMovie />
</div>
</template>

<script>
import axios from 'axios'
import CINEMA_API from "../_static/CinemaAPI"
import Movie from '../components/Movie'
export default {
    components: {
        Movie
    },
    data() {
        return {
            movie: {
                id: null,
                title: null,
                trailerUri: null,
                genres: [],
                productionCompanies: [],
                description: null
            },
            errorSignal: false,
            errorMsg: ''
        }
    },
    methods: {
        showToast(data, variant) {
            this.$bvToast.toast(data, {
                title: 'Info',
                variant: variant,
                solid: true,
                autoHideDelay: 5000,
                appendToast: false
            })
        },
        deleteMovie() {
            CINEMA_API.MOVIE.deleteById(this.movie.id).then(response => {
                    console.log(response.data)
                    this.showToast('Deleted!', 'success')
                    setTimeout(() => {
                        this.$router.replace(`/movie-search`)
                    }, 2000);

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
                    this.showToast(errorMessage, 'danger')
                })
        }
    },
    mounted() {
        let movieRequest = CINEMA_API.MOVIE.getById(this.$route.params.id)
        let genresRequest = CINEMA_API.MOVIE.getGenresById(this.$route.params.id)
        let productionCompaniesRequest = CINEMA_API.MOVIE.getProductionCompaniesById(this.$route.params.id)
        movieRequest.then(response => {
            this.movie = response.data
            axios.all([genresRequest, productionCompaniesRequest]).then(axios.spread((...responses) => {
            this.movie.genres = responses[0].data
            this.movie.productionCompanies = responses[1].data
            console.log(this.movie)
        }))
        })
        .catch(error => {
            this.errorSignal = true
            this.errorMsg = error.response.data.message
            console.log(error)
        })
    }
}
</script>

<style>

</style>
