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
    }
}
</script>

<style>

</style>
