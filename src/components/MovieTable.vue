<template>
<div>
    <b-table fixed hover small table-variant="primary" :items="items" :fields="fields" striped responsive="sm">
        <template v-slot:cell(show_details)="row">
            <b-button size="sm" variant='primary' @click="row.toggleDetails">
                {{ row.detailsShowing ? 'Hide' : 'Show'}} Details
            </b-button>
        </template>

        <template v-slot:cell(edit)="row">
            <b-button v-b-modal.movie-edit-modal size="sm" variant='success' @click="setSelectedMovie(row)">
                <b-icon icon="pencil"></b-icon>
            </b-button>
        </template>

        <template v-slot:cell(delete)="row">
            <b-button size="sm" variant='danger'>
                <b-icon icon="trash"></b-icon>
            </b-button>
        </template>

        <template v-slot:row-details="row">
            <b-card>
                <Movie :item="row.item"></Movie>
                <b-button size="sm" @click="row.toggleDetails">Hide Details</b-button>
            </b-card>
        </template>
    </b-table>
    <b-modal id="movie-edit-modal" size="lg" title="Edit movie"  hide-footer>
        <div>
            <MovieNew :selected=selected @movieSaved=updateMovie />
        </div>
        <template v-slot:modal-footer="{ ok, cancel, hide }">
            <b-button size="sm" variant="success" @click="saveMovie()">
                OK
            </b-button>
            <b-button size="sm" variant="danger" @click="cancel()">
                Cancel
            </b-button>
        </template>
    </b-modal>
</div>
</template>

<script>
import Movie from './Movie.vue'
import MovieNew from './MovieNew.vue'
export default {
    components: {
        Movie,
        MovieNew
    },
    data() {
        return {
            fields: ['title', 'duration', 'releaseYear', 'show_details', 'edit', 'delete'],
            selected: null
        }
    },
    props: {
        items: Array
    },
    methods: {
        setSelectedMovie(movie) {
            this.selected = {
                id: movie.item.id,
                title: movie.item.title,
                trailerUri: movie.item.trailerUri,
                description: movie.item.description,
                duration: movie.item.duration,
                releaseYear: movie.item.releaseYear,
                genres: movie.item.genres,
                productionCompanies: movie.item.productionCompanies
            }
        },
        updateMovie() {
            var item = this.items.find(item => item.id === this.selected.id)
            item = {
                id: this.selected.id,
                title: this.selected.title,
                trailerUri: this.selected.trailerUri,
                description: this.selected.description,
                duration: this.selected.duration,
                releaseYear: this.selected.releaseYear,
                genres: this.selected.genres,
                productionCompanies: this.selected.productionCompanies
            }
            this.$refs['movie-edit-modal'].hide()
            return item
        }
    }
}
</script>
