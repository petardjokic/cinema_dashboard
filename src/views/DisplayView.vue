<template>
<div>
    <Display :display=display @cancel=cancelDisplay />
</div>
</template>

<script>
import axios from 'axios'
import CINEMA_API from "../_static/CinemaAPI"
import Display from '../components/Display'
export default {
    components: {
        Display
    },
    data() {
        return {
            display: {
                id: null,
                startAt: null,
                movie: null,
                hall: null,
                prices: null,
                tickets: null
            }
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
        cancelDisplay() {
            CINEMA_API.DISPLAY.cancelById(this.display.id).then(response => {
                this.display.active = response.data.active
                this.showToast('Display canceled!', 'success')
            }).catch(error => {
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
        CINEMA_API.DISPLAY.getById(this.$route.params.id).then(response => {
            this.display = response.data
            let genresRequest = CINEMA_API.MOVIE.getGenresById(this.display.movie.id)
            let productionCompaniesRequest = CINEMA_API.MOVIE.getProductionCompaniesById(this.display.movie.id)
            axios.all([genresRequest, productionCompaniesRequest]).then(axios.spread((...responses) => {
            this.display.movie.genres = responses[0].data
            this.display.movie.productionCompanies = responses[1].data
            console.log(this.movie)
        })).catch(error => {
            console.log(error)
        })
            console.log(this.display)
        }).catch(error => {
            console.log(error)
        })
    }
}
</script>

<style>

</style>
