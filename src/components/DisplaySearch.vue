<template>
<div>
    <b-table hover small table-variant="info" :items="getItems" :fields="fields" striped responsive="sm">
        <template v-slot:cell(show_details)="row">
            <b-button size="sm" @click="row.toggleDetails" class="mr-2">
                {{ row.detailsShowing ? 'Hide' : 'Show'}} Details
            </b-button>
        </template>

        <template v-slot:row-details="row">
            <b-card>
                <Display :display="findDisplay(row.item.id)" />
                <b-button size="sm" @click="row.toggleDetails">Hide Details</b-button>
            </b-card>
        </template>
    </b-table>
</div>
</template>

<script>
import Display from './Display.vue'
import {
    cinemaApi
} from '../_destinations/destinations.js'
import axios from 'axios'
export default {
    components: {
        Display
    },
    data() {
        return {
            fields: ['date', 'time', 'movie', 'hall', 'show_details'],
            displays: []
        }
    },
    computed: {
        getItems() {
            var mapped = []
            this.displays.forEach(disp => {
                if (disp != null) {
                    mapped.push({
                        id: disp.id,
                        date: disp.startsAt,
                        time: disp.startsAt,
                        movie: disp.movie.title,
                        hall: disp.hall.name

                    })
                }
            })
            return mapped
        }
    },
    methods: {
        findDisplay(rowItemId) {
            const arr =this.displays.filter(display => display.id === rowItemId)
            return arr[0]
        }
    },
    created() {
        axios.get(cinemaApi.BASE_URL + cinemaApi.DISPLAYS).then(response => {
            this.displays = response.data
        }).catch(err => {
            console.log(err)
        })
    }
}
</script>
