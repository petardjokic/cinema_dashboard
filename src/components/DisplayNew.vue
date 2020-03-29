<template>
<div>
    <DisplayEntry :selected=selected :movies=movies :halls=halls />
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
import DisplayEntry from './DisplayEntry.vue'
export default {
    components: {
        DisplayEntry
    },
    data() {
        return {
            movies: [],
            halls: []
        }
    },
    props: {
        selected: Object
    },
    created() {
        const urlMovies = axios.get(cinemaApi.BASE_URL + cinemaApi.MOVIES)
        const urlHalls = axios.get(cinemaApi.BASE_URL + cinemaApi.HALLS)
        axios.all([urlMovies, urlHalls]).then(axios.spread((...responses) => {
            this.movies = responses[0].data
            this.halls = responses[1].data
        })).catch(err => {
            //modal message and router go
            console.log(err)
        })
    },
    methods: {
        onReset() {
            this.selected = {
                movie: null,
                hall: null,
                time: null,
                date: null,
                displayPrices: []
            }
        },
        onSubmit() {
            var sPrices = []
            const startsAt = this.selected.date + 'T' + this.selected.time
            if (this.selected.displayPrices[1].id == null) {
                Object.entries(this.selected.displayPrices).forEach(entry => {
                    sPrices.push({
                        seatTypeId: entry[0],
                        price: parseFloat(entry[1])
                    })
                })
            }
            var display = {
                id: this.selected.id,
                movie: this.selected.movie,
                hall: this.selected.hall,
                startsAt: startsAt,
                displayPrices: this.selected.displayPrices
            }
            console.log(display)
            axios.post(cinemaApi.BASE_URL + cinemaApi.SAVE_DISPLAY, display).then(response => {
                response.data
                this.$emit('displaySaved', response.data)
            }).catch(err => {
                console.log(err)
            })

        }
    }

}
</script>

<style>

</style>
