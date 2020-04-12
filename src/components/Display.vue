<template>
<div v-if="display != null">
    <b-tabs content-class="mt-3">
        <b-tab lazy title="Display">
            <SingleElementTable :item=display type="display" :vertical="false" />
            <SingleElementTable :item=display type="ticket" :vertical="false" />
        </b-tab>
        <b-tab title="Movie">
            <Movie :movie=display.movie />
        </b-tab>
        <b-tab active title="Tickets">
            <HallView :display=display />
        </b-tab>
    </b-tabs>
</div>
</template>

<script>
import Movie from "./Movie.vue"
import HallView from "./HallView.vue"
import SingleElementTable from "./SingleElementTable.vue"

export default {
    components: {
        Movie,
        HallView,
        SingleElementTable
    },
    data() {
        return {
            movie: {}
        }
    },
    props: {
        display: Object
    }
}
</script>

<style>

</style>
