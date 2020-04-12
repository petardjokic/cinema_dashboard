<template>
<div>
    <DisplayEntry :display=display />
    <hr>
    <b-button type="submit" variant="primary" @click="onSubmit">Submit</b-button>
    <b-button type="reset" variant="danger" @click="onReset">Reset</b-button>
</div>
</template>

<script>
import axios from 'axios'
import {
    cinemaApi
} from '../_destinations/destinations.js'
import DisplayEntry from './DisplayEntry.vue'
export default {
    components: {
        DisplayEntry
    },
    props: {
        display: Object
    },
    methods: {
        onReset() {
            this.display = {
                id: null,
                movie: null,
                hall: null,
                startsAt: '',
                prices: [],
                tickets: [],
                seatsAvailability: []
            }
        },
        onSubmit() {
            var displayToSend = {
                id: this.display.id,
                movie: {
                    id: this.display.movie.id
                },
                hall: {
                    id:this.display.hall.id
                },
                category: {
                    id:this.display.category.id
                },
                startsAt: this.display.startsAt
            }
            axios.post(cinemaApi.BASE_URL + cinemaApi.DISPLAYS, displayToSend).then(response => {
                this.$emit('displaySaved', response.data)
            }).catch(err => {
                console.log(err.response.data)
            })
        }
    }
}
</script>

<style>

</style>
