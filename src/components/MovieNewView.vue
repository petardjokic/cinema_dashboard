<template>
<b-row>
    <b-col></b-col>
    <b-col cols=7>
        <b-jumbotron fluid bg-variant="primary" text-variant="white" border-variant="dark">
            <template v-slot:header>New Movie</template>
            <hr class="my-4">
            <MovieNew :movie=selected @movieSaved=goToMovieTable />
            
        </b-jumbotron>
    </b-col>
    <b-col></b-col>
</b-row>
</template>

<script>
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
                trailerUri: "",
                releaseYear: null,
                duration: null,
                description: '',
                genres: [],
                productionCompanies: []
            }
        }
    },
    methods() {
        this.$router.push('/movie-search')
    }
}
</script>

<style>

</style>
