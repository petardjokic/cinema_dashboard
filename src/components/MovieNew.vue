<template>
<b-row>
    <b-col></b-col>
    <b-col cols=6>
        <b-jumbotron bg-variant="primary" text-variant="white" border-variant="dark">
            <template v-slot:header>New Movie</template>
            <hr class="my-4">
            <MovieEntry :selected=selected :genres=genres :productionCompanies=productionCompanies />
            <hr>
            <b-button type="submit" variant="primary" @click="onSubmit">Submit</b-button>
            <b-button type="reset" variant="danger" @click="onReset">Reset</b-button>
        </b-jumbotron>
    </b-col>
    <b-col></b-col>
</b-row>
</template>

<script>
import axios from 'axios'
import MovieEntry from './MovieEntry.vue'
export default {
    components: {
        MovieEntry
    },
    data() {
        return {
            selected: {
                id: null,
                title: "Title generic",
                releaseYear: null,
                duration: null,
                description: 'Generic',
                genres: [],
                productionCompanies: []
            },
            genres: [],
            productionCompanies: []
        }
    },
    created() {
        console.log("Movie new created!")
        const urlGenres = axios.get("http://localhost:8083/api/genres")
        const urlProductionCompany = axios.get("http://localhost:8083/api/productionCompanies")
        axios.all([urlGenres, urlProductionCompany]).then(axios.spread((...responses) => {
            this.genres = responses[0].data
            this.productionCompanies = responses[1].data
        })).catch(err => {
            console.log(err)
        })
    },
    mounted() {
        console.log("Movie new mounted!")
    },
    methods: {
        onReset() {

        },
        onSubmit() {
            
            this.selected.genres = this.selected.genres.map(genre => {
                return {id: genre}
            })
            console.log(this.selected.genres)
            this.selected.productionCompanies = this.selected.productionCompanies.map(productionCompany => {
                return {id: productionCompany}
            })
            axios.post("http://localhost:8083/api/movies/save", this.selected).then(response => {
                console.log(response.data)
            })
            console.log("sub")
        }
    }
}
</script>

<style>

</style>
