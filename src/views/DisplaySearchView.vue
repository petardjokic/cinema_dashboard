<template>
<b-jumbotron fluid container-fluid :bg-variant=theme.BG_PRIMARY :text-variant=theme.TEXT_PRIMARY :border-variant=theme.BG_PRIMARY>
    <template v-slot:header>Display Search</template>

    <template v-slot:lead>
        Search for displays
        <div>
            <b-form @submit="searchDisplays">
                <div class="my-3 d-flex justify-content-between">
                    <b-input-group class="mr-1" prepend="From">
                        <b-form-input v-model="searchParams.dateFrom" type='date' placeholder="Enter title"></b-form-input>
                    </b-input-group>
                    <b-input-group class="mr-1" prepend="To">
                        <b-form-input v-model="searchParams.dateTo" type='date' placeholder="Enter title"></b-form-input>
                    </b-input-group>
                    <b-input-group class="mr-1" prepend="Movie Title">
                        <b-form-input v-model="searchParams.movieTitle" placeholder="Enter title"></b-form-input>
                    </b-input-group>
                    <b-button class='px-5' type="submit">Search</b-button>
                </div>
            </b-form>
        </div>
    </template>

    <hr class="my-4">
    <DisplayTable :displays=listDisplays @cancelDisplay='cancelDisplay($event)' @updateDisplay='updateDisplay($event)' />
</b-jumbotron>
</template>

<script>
import {
    Theme
} from '../_static/Theme'
import DisplayTable from '../components/DisplayTable.vue'
import CINEMA_API from '../_static/CinemaAPI'
export default {
    components: {
        DisplayTable
    },
    data() {
        return {
            theme: Theme,
            searchParams: {
                movieTitle: '',
                dateFrom: null,
                dateTo: null
            },
            listDisplays: []
        }
    },
    methods: {
        searchDisplays(event) {
            event.preventDefault()
            CINEMA_API.DISPLAY.search(this.searchParams).then(response => {
                this.listDisplays = response.data
            }).catch(error => {
                this.listDisplays = []
                let errorMessage = ''
                if (error.response) {
                    // Request made and server responded
                    console.log(error.response.data.message);
                    errorMessage = error.response.data.message
                } else if (error.request) {
                    // The request was made but no response was received
                    console.log(error.request);
                    errorMessage = 'Server is unavailable'
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                    errorMessage = `ERROR: ${error.message}`
                }
                this.showToast(errorMessage, 'danger')
            })
        },
        showToast(data, variant) {
            this.$bvToast.toast(data, {
                title: 'Info',
                variant: variant,
                solid: true,
                autoHideDelay: 5000,
                appendToast: false
            })
        },
        updateDisplay(displayArg) {
            const display = this.listDisplays.find(display => display.id === displayArg.id)
            display.movie = displayArg.movie
            display.hall = displayArg.hall
            display.startsAt = displayArg.startsAt
        },
        cancelDisplay(displayId) {
            const disp = this.listDisplays.find(display => display.id === displayId)
            console.log("Before")
            console.log(disp)
            disp.active = false
            console.log("After")
            console.log(disp)
        }
    },
    created() {
        CINEMA_API.DISPLAY.getAll().then(response => {
            this.listDisplays = response.data
        }).catch(err => {
            console.log(err)
        })
    }
}
</script>
