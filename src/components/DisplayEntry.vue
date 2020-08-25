<template>
<div>
    <b-row>
        <b-col cols=6>
            <b-form-group id="fieldset-id" label="ID:" label-for="input-id">
                <b-form-input v-model=display.id id="input-id" type="number" placeholder="Display ID" disabled></b-form-input>
            </b-form-group>
        </b-col>
        <b-col cols=6>
            <b-form-group id="fieldset-category" description="Select category" label="Category:" label-for="input-category">
                <b-form-select required v-model=display.category.id :options=optionsCategory></b-form-select>
            </b-form-group>
        </b-col>
    </b-row>
    <b-row>
        <b-col>
            <b-form-group id="fieldset-movie" description="Select movie" label="Movie:" label-for="input-movie">
                <b-form-select required v-model=display.movie.id :options=optionsMovie></b-form-select>
            </b-form-group>
        </b-col>
        <b-col>
            <b-form-group id="fieldset-hall" description="Select Hall" label="Hall:" label-for="input-hall">
                <b-form-select required v-model=display.hall.id :options=optionsHall></b-form-select>
            </b-form-group>
        </b-col>
    </b-row>
    <b-row>
        <b-col>
            <b-form-group id="fieldset-time" description="Enter time" label="Time:" label-for="input-time">
                <b-form-input v-model=time id="input-time" type="time" @change="startsAtChanged"></b-form-input>
            </b-form-group>
        </b-col>
        <b-col>
            <b-form-group id="fieldset-date" description="Enter date" label="Date:" label-for="input-date">
                <b-form-input v-model=date id="input-date" type="date" @change="startsAtChanged"></b-form-input>
            </b-form-group>
        </b-col>
    </b-row>

</div>
</template>

<script>
import axios from 'axios'
import {
    cinemaApi
} from '../_destinations/destinations.js'
export default {
    data() {
        return {
            movies: [],
            halls: [],
            categories: [],
            time: '',
            date: ''
        }
    },
    props: {
        display: Object,
    },
    computed: {
        optionsMovie() {
            var array = []
            this.movies.forEach(movie => {
                array.push({
                    value: movie.id,
                    text: movie.title
                })
            });
            return array
        },
        optionsHall() {
            var array = []
            this.halls.forEach(hall => {
                array.push({
                    value: hall.id,
                    text: hall.name
                })
            });
            return array
        },
        optionsCategory() {
            var array = []
            this.categories.forEach(category => {
                array.push({
                    value: category.id,
                    text: category.name
                })
            });
            return array
        },
        startsAt() {
            return this.date + 'T' + this.time
        }
    },
    methods: {
        startsAtChanged() {
            this.display.startsAt = this.startsAt
        }
    },
    mounted() {
        const urlMovies = axios.get(cinemaApi.BASE_URL + cinemaApi.MOVIES)
        const urlHalls = axios.get(cinemaApi.BASE_URL + cinemaApi.HALLS)
        const urlCategories = axios.get(cinemaApi.BASE_URL + cinemaApi.CATEGORIES)
        axios.all([urlMovies, urlHalls, urlCategories]).then(axios.spread((...responses) => {
            this.movies = responses[0].data
            this.halls = responses[1].data
            this.categories = responses[2].data
            this.time = this.display.startsAt.split('T')[1].split('.')[0].substring(0, 5)
            console.log(this.time)
            this.date = this.display.startsAt.split('T')[0]
        })).catch(err => {
            //modal message and router go
            console.log(err)
        })
    },
}
</script>

<style scoped>

</style>
