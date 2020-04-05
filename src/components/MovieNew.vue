<template>
<div v-if="movie != null">
    <MovieEntry :movie=movie />
    <hr>
    <b-button type="submit" variant="primary" @click="onSubmit">Save</b-button>
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
    props: {
        movie: Object
    },
    methods: {
        onReset() {
            this.selected = {
                title: '',
                trailerUri: '',
                releaseYear: null,
                duration: null,
                description: '',
                genres: [],
                productionCompanies: []
            }
        },
        onSubmit() {
            axios.post(cinemaApi.BASE_URL + cinemaApi.MOVIES, this.movie).then(response => {
                this.selected = response.data
                this.$emit('movieSaved', {...this.selected})
            })
        }
    }
}
</script>

<style>

</style>
