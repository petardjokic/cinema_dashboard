<template>
<b-row>
    <b-col></b-col>
    <b-col cols=12>
        <b-jumbotron container-fluid bg-variant="primary" text-variant="white" border-variant="dark">
            <template v-slot:header>Display Search</template>

            <template v-slot:lead>
                This is a simple hero unit, a simple jumbotron-style component for calling extra attention to
                featured content or information.
            </template>

            <hr class="my-4">

        </b-jumbotron>
        <DisplayTable :items=listDisplays />
    </b-col>
    <b-col></b-col>
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
    created() {
        axios.get(cinemaApi.BASE_URL + cinemaApi.DISPLAYS).then(response => {
            this.listDisplays = response.data
        }).catch(err => {
            console.log(err)
        })
    }
}
</script>
