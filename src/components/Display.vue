<template>
<div v-if="display != null">
    <b-tabs active content-class="mt-3">
        <b-tab title="Display">
            <SingleElementTable :item=display type="display" :vertical="false" />
            <SingleElementTable :item=display type="ticket" :vertical="false" />
            <div>
                <b-button variant="outline-primary">Add to cart</b-button>
                <b-button variant="outline-success">Button</b-button>
                <b-button variant="outline-danger">Button</b-button>
            </div>
        </b-tab>
        <b-tab lazy title="Movie">
            <Movie :id=display.movie.id />
        </b-tab>
        <b-tab lazy title="Tickets">
            <HallView :display=display />
        </b-tab>
    </b-tabs>
</div>
</template>

<script>
import axios from 'axios'
import {cinemaApi} from '../_destinations/destinations.js'
import Movie from "./Movie.vue"
import HallView from "./HallView.vue"
import SingleElementTable from "./SingleElementTable.vue"

export default {
    data() {
        return {
            item: null
        }
    },
    components: {
        Movie,
        HallView,
        SingleElementTable
    },
    props: {
        id: Number
    },
    computed: {
        display() {
            return this.item
        }
    },
    mounted() {
        const urlDisplay = cinemaApi.BASE_URL + cinemaApi.DISPLAYS + this.id
        console.log(urlDisplay)
        axios.get(urlDisplay).then(response => {
            this.item = response.data
            console.log(this.item)
        }).catch(err => {
            console.log(err)
        })
    }
}
</script>

<style>

</style>
