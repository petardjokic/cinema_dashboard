<template>
<div class="movie">
    <b-row v-if="movie != null">
        <b-col>
            <SingleElementTable :item=item type="movie" :vertical="true" />
        </b-col>
        <b-col>
            <b-embed type="iframe" aspect="16by9" :src="'https://www.youtube.com/embed/' + item.trailerUri" allowfullscreen></b-embed>
        </b-col>
    </b-row>
</div>
</template>

<script>
import axios from 'axios'
import {cinemaApi} from '../_destinations/destinations.js'
import SingleElementTable from "./SingleElementTable.vue"

export default {
    components: {
        SingleElementTable
    },
    data() {
        return {
            movie: null
        }
    },
    props: {
        id: {
            type: Number,
            default() {
                return null
            }
        }
    },
    computed: {
        item() {
            return this.movie
        }
    },
    mounted() {
        const urlMovie = cinemaApi.BASE_URL + cinemaApi.MOVIES + this.id
        console.log(urlMovie)
        axios.get(urlMovie).then(response => {
            this.movie = response.data
            console.log(this.movie)
        }).catch(err => {
            console.log(err)
        })
    }
}
</script>

<style scoped>
</style>
