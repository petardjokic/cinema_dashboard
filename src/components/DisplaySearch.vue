<template>
<b-row>
    <b-col cols=12>
        <b-jumbotron container-fluid bg-variant="primary" text-variant="white" border-variant="dark">
            <template v-slot:header>Display Search</template>

            <template v-slot:lead>
                Search for displays
            </template>

            <hr class="my-4">

        </b-jumbotron>
        <DisplayTable :displays=listDisplays @deleteDisplay='removeFromList($event)' @updateDisplay='updateDisplay($event)' />
    </b-col>
</b-row>
</template>

<script>
import DisplayTable from './DisplayTable.vue'
import {
    cinemaApi
} from '../_destinations/destinations.js'
import axios from 'axios'
export default {
    components: {
        DisplayTable
    },
    data() {
        return {
            searchParams: {},
            listDisplays: []
        }
    },
    methods: {
        updateDisplay(displayArg) {
            const display = this.listDisplays.find(display => display.id === displayArg.id)
            display.movie = displayArg.movie
            display.hall = displayArg.hall
            display.startsAt = displayArg.startsAt
        },
        removeFromList(displayId) {
            this.listDisplays = this.listDisplays.filter(display => display.id !== displayId)
        }
    },
    created() {
        axios.get(cinemaApi.BASE_URL + cinemaApi.DISPLAYS).then(response => {
            this.listDisplays = response.data
        }).catch(err => {
            console.log(err)
        })
    }
}
</script>
