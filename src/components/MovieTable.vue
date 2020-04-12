<template>
<div>
    <b-table hover small table-variant="dark" :items=items :fields=fields striped responsive>
        <template v-slot:cell(show_details)="row">
            <b-button size="sm" variant='primary' @click=showDetails(row)>
                {{ row.detailsShowing ? 'Hide' : 'Show'}} Details
            </b-button>
        </template>

        <template v-slot:row-details="row">
            <b-card>
                <Movie :movie=selected />
                <b-button size="sm" @click=row.toggleDetails>Hide Details</b-button>
            </b-card>
        </template>

        <template v-slot:cell(edit)="row">
            <b-button v-b-modal.movie-edit-modal size="sm" variant='success' @click="setSelectedMovie(row.item)">
                <b-icon icon="pencil"></b-icon>
            </b-button>
        </template>

        <template v-slot:cell(delete)="row">
            <b-button v-b-modal.movie-delete-modal size="sm" variant='danger' @click="setSelectedMovie(row.item)">
                <b-icon icon="trash"></b-icon>
            </b-button>
        </template>
    </b-table>
    <!-- MODALS -->
    <b-modal id="movie-edit-modal" size="lg" title="Edit movie" hide-footer>
        <div>
            <MovieNew :movie=selected @movieSaved='updateMovie($event)' />
        </div>
        <template v-slot:modal-footer="{cancel}">
            <b-button size="sm" variant="success" >
                Save
            </b-button>
            <b-button size="sm" variant="danger" @click="cancel()">
                Cancel
            </b-button>
        </template>
    </b-modal>
    <b-modal id="movie-delete-modal" title="Delete Movie">
        <p v-if="selected != null" class="my-4">Are you sure you want to delete <strong>{{selected.title}}</strong>?</p>
        <template v-slot:modal-footer="{cancel}">
            <b-button size="sm" variant="danger" @click="deleteMovie()">
                Delete
            </b-button>
            <b-button size="sm" variant="primary" @click="cancel()">
                Cancel
            </b-button>
        </template>
    </b-modal>
</div>
</template>

<script>
import axios from 'axios'
import {
    cinemaApi
} from '../_destinations/destinations.js'
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
            const movieId = movie.id
            this.selected = null
            const urlMovie = cinemaApi.BASE_URL + cinemaApi.MOVIES + movieId
            console.log(urlMovie)
            axios.get(urlMovie).then(response => {
                this.selected = response.data
            }).catch(err => {
                console.log(err)
            })
        },
        showDetails(row) {
            this.setSelectedMovie(row.item)
            row.toggleDetails()
        },
        updateMovie(movie) {
            this.$emit('updateMovie', movie)
            this.$bvModal.hide('movie-edit-modal')
        },
        deleteMovie() {
            const urlMovie = cinemaApi.BASE_URL + cinemaApi.MOVIES + this.selected.id
            var movieId = this.selected.id
            axios.delete(urlMovie).then(response => {
                this.selected = response.data
                this.$emit('deleteMovie', movieId)
                this.$bvModal.hide('movie-delete-modal')
            }).catch(err => {
                console.log(err)
            })
        }
    }
}
</script>
