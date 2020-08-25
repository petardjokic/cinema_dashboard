<template>
<div v-if="display.id">
    <b-jumbotron fluid container-fluid :bg-variant=theme.BG_PRIMARY :text-variant=theme.TEXT_PRIMARY :border-variant=theme.BG_PRIMARY>
        <template v-slot:header>
            {{startsAtDate}}
            <br />
            {{startsAtTime}}
        </template>
        <template v-slot:lead>
            {{display.movie.title}} @ {{display.hall.name}}
        </template>
        <hr class="my-4">
        <b-tabs content-class="mt-3" :class="`bg-${theme.BG_PRIMARY} text-${theme.TEXT_PRIMARY}`" :active-nav-item-class="`bg-${theme.BG_SECONDARY}`">
            <b-tab lazy title="Display" :title-link-class="`text-${theme.TEXT_PRIMARY}`">
                <div class="d-flex justify-content-start">
                    <div class='pr-5'>Status:</div>
                    <b-button disabled size='sm' class='mx-5 px-5' :variant="display.active ? 'outline-success': 'outline-danger'">
                        {{status}}
                    </b-button>
                    <b-button class='mx-5 px-5' v-if="status == 'Active'" @click="cancelDisplay" size='sm' variant='danger'>
                        Cancel display
                    </b-button>
                </div>
                <SeatInfo :display=display />
            </b-tab>
            <b-tab title="Movie" :title-link-class="`text-${theme.TEXT_PRIMARY}`">
                <Movie :movie=display.movie />
            </b-tab>
            <b-tab title="Tickets" :title-link-class="`text-${theme.TEXT_PRIMARY}`">
                <HallView :display=display />
            </b-tab>
        </b-tabs>
    </b-jumbotron>
</div>
</template>

<script>
import {
    Theme
} from '../_static/Theme'
import Movie from "./Movie.vue"
import HallView from "./HallView.vue"
import SeatInfo from "./SeatInfo.vue"
export default {
    components: {
        Movie,
        HallView,
        SeatInfo
    },
    data() {
        return {
            theme: Theme
        }
    },
    props: {
        display: Object
    },
    computed: {
        startsAtDate() {
            return new Date(this.display.startsAt).toString().split(' GMT')[0].substring(0, 15)
        },
        startsAtTime() {
            return new Date(this.display.startsAt).toString().split(' GMT')[0].substring(16)
        },
        status() {
            if (!this.display.active)
                return 'Canceled'
            if (new Date(this.display.startsAt) < new Date())
                return 'Finished'
            return 'Active'
        },
    },
    methods: {
        cancelDisplay() {
            this.$emit('cancel')
        }
    }
}
</script>

<style>

</style>
