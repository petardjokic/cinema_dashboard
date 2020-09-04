<template>
<b-jumbotron fluid container-fluid :bg-variant=theme.BG_PRIMARY :text-variant=theme.TEXT_PRIMARY :border-variant=theme.BG_PRIMARY>
    <template v-slot:header>{{movie.title}}({{movie.releaseYear}})<b-button @click=deleteMovie class='py-3 mt-3 mb-5 float-right' variant="outline-danger">Delete</b-button></template>
    <template v-slot:lead>{{movie.description}}</template>
    <hr class="my-4">
    <div>
        <b-card title="Duration" :sub-title="`${movie.duration} min`" bg-variant="dark"></b-card>
    </div>
    <div class="d-flex justify-content-between">
        <div>
            <b-card title="Genres" bg-variant="dark">
                <b-card-sub-title>
                    <p v-for="genre in movie.genres" :key=genre.id button variant='dark'>{{genre.name}}</p>
                </b-card-sub-title>
            </b-card>
        </div>
        <div>
            <b-card title="Production companies" bg-variant="dark">
                <b-card-sub-title>
                    <p v-for="pc in movie.productionCompanies" :key=pc.id>{{pc.name}}</p>
                </b-card-sub-title>
            </b-card>
        </div>
        <div class="w-50">
            <b-embed type="iframe" :src="`https://www.youtube.com/embed/${movie.trailerUri}`" allowfullscreen></b-embed>
        </div>
    </div>
</b-jumbotron>
</template>

<script>
import {
    Theme
} from '../_static/Theme'
export default {
    data() {
        return {
            theme: Theme
        }
    },
    props: {
        movie: Object
    },
    methods: {
        deleteMovie() {
            this.$emit('delete')
        }
    }
}
</script>

<style scoped>
</style>
