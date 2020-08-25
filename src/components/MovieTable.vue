<template>
<div>
    <b-table hover small dark :table-variant=theme.BG_PRIMARY :table-class="`text-center text-${theme.TEXT_PRIMARY}`" :items=items :fields=fields responsive>
        <template v-slot:cell(details)="row">
            <b-button block variant='outline-light' size="sm" :to="`movies/${row.item.id}`">Details</b-button>
        </template>
    </b-table>
    <!-- <template v-slot:cell(edit)="row">
            <b-button v-b-modal.movie-edit-modal size="sm" variant='success' @click="setSelectedMovie(row.item)">
                <b-icon icon="pencil"></b-icon>
            </b-button>
        </template>

        <template v-slot:cell(delete)="row">
            <b-button v-b-modal.movie-delete-modal size="sm" variant='danger' @click="setSelectedMovie(row.item)">
                <b-icon icon="trash"></b-icon>
            </b-button>
        </template>

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
    </b-modal> -->
</div>
</template>

<script>
import {
    Theme
} from '../_static/Theme'
export default {
    components: {},
    data() {
        return {
            theme: Theme,
            fields: ['title', 'duration', 'releaseYear', 'details']
        }
    },
    props: {
        items: Array
    },
    methods: {
        // setSelectedMovie(movie) {
        //     const movieId = movie.id
        //     this.selected = null
        //     const urlMovie = cinemaApi.BASE_URL + cinemaApi.MOVIES + movieId
        //     console.log(urlMovie)
        //     axios.get(urlMovie).then(response => {
        //         this.selected = response.data
        //     }).catch(err => {
        //         console.log(err)
        //     })
        // }
    }
}
</script>
