<template>
<b-row>
    <b-col></b-col>
    <b-col cols=6>
        <b-jumbotron bg-variant="primary" text-variant="white" border-variant="dark">
            <template v-slot:header>New Display</template>
            <hr class="my-4">
            <DisplayNew :display=display />
        </b-jumbotron>
    </b-col>
    <b-col></b-col>
</b-row>
</template>

<script>
import DisplayNew from './DisplayNew.vue'
export default {
    components: {
        DisplayNew
    },
    data() {
        return {
            display: {
                id: null,
                movie: {},
                hall: {},
                startsAt: '2020-04-04T13:35:06.517',
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
