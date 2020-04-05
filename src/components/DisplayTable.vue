<template>
<div>
    <b-table hover small :items=items :fields=fields striped responsive>
        <template v-slot:cell(show_details)="row">
            <b-button size="sm" @click=showDetails(row) class="mr-2">
                {{ row.detailsShowing ? 'Hide' : 'Show'}} Details
            </b-button>
        </template>

        <template v-slot:row-details="row">
            <b-card>
                <Display :display=selected />
                <b-button size="sm" @click="row.toggleDetails">Hide Details</b-button>
            </b-card>
        </template>

        <template v-slot:cell(edit)="row">
            <b-button v-b-modal.display-edit-modal size="sm" variant='success' @click="setSelectedDisplay(row)">
                <b-icon icon="pencil"></b-icon>
            </b-button>
        </template>

        <template v-slot:cell(delete)="row">
            <b-button v-b-modal.display-delete-modal size="sm" variant='danger' @click="setSelectedDisplay(row)">
                <b-icon icon="trash"></b-icon>
            </b-button>
        </template>        
    </b-table>
    <!-- MODALS -->
    <b-modal id="display-edit-modal" size="lg" title="Edit display" hide-footer>
        <div>
            <DisplayNew :selected=selected @displaySaved=updateDisplay />
        </div>
        <template v-slot:modal-footer="{ ok, cancel }">
            <b-button size="sm" variant="success" @click="saveDisplay()">
                OK
            </b-button>
            <b-button size="sm" variant="danger" @click="cancel()">
                Cancel
            </b-button>
        </template>
    </b-modal>
    <b-modal static id="display-delete-modal" title="Delete display" hide-footer>
        <p v-if="selected != null" class="my-4">Are you sure you want to delete?</p>
        <template v-slot:modal-footer="{ ok, cancel }">
            <b-button size="sm" variant="danger" @click="deleteDisplay()">
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
import Display from './Display.vue'
import DisplayNew from './DisplayNew.vue'
export default {
    components: {
        Display,
        DisplayNew
    },
    data() {
        return {
            fields: ['date', 'time', 'movie', 'hall', 'show_details', 'edit', 'delete'],
            selected: null
        }
    },
    props: {
        displays: Array
    },
    computed: {
        items() {
            var mapped = []
            this.displays.forEach(disp => {
                if (disp != null) {
                    mapped.push({
                        id: disp.id,
                        date: disp.startsAt.split('T')[0],
                        time: disp.startsAt.split('T')[1],
                        movie: disp.movie.title,
                        hall: disp.hall.name
                    })
                }
            })
            return mapped
        }
    },
    methods: {
        setSelectedDisplay(display) {
            let displayId = display.id
            const urlDisplay = cinemaApi.BASE_URL + cinemaApi.DISPLAYS + displayId
            console.log(urlDisplay)
            axios.get(urlDisplay).then(response => {
                this.selected = response.data
                console.log(this.selected)
            }).catch(err => {
                console.log(err)
            })
        },
        showDetails(row) {
            this.setSelectedDisplay(row.item)
            row.toggleDetails()
        },
        updateDisplay() {
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
            this.$refs['display-edit-modal'].hide()
            return item
        },
        deleteDisplay() {

        }
    }
}
</script>
