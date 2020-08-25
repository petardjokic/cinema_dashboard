<template>
<div class='d-flex justify-content-center'>
    <b-jumbotron container-fluid fluid :bg-variant=theme.BG_PRIMARY :text-variant=theme.TEXT_PRIMARY :border-variant=theme.BG_PRIMARY>
        <template v-slot:header>New Display</template>
        <hr class="my-4">
        <DisplayNew :display=display />
    </b-jumbotron>
</div>
</template>

<script>
import {
    Theme
} from '../_static/Theme'
import DisplayNew from '../components/DisplayNew.vue'
export default {
    components: {
        DisplayNew
    },
    data() {
        return {
            theme: Theme,
            display: {
                id: null,
                movie: {},
                hall: {},
                startsAt: new Date().toISOString(),
                category: {
                    prices: []
                },
                tickets: [],
                seatsAvailability: []
            }
        }
    }
}
</script>

<style>

</style>
