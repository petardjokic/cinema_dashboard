<template>
<div class="movie">
    <b-row v-if="movie == null">
        <div>
            <b-button variant="primary" disabled>
                <b-spinner small></b-spinner>
                <span>Loading...</span>
            </b-button>
        </div>
    </b-row>
    <b-row v-else>
        <b-col>
            <SingleElementTable :item=movie type="movie" :vertical="true" />
        </b-col>
        <b-col>
            <b-embed type="iframe" aspect="16by9" :src="'https://www.youtube.com/embed/' + movie.trailerUri" allowfullscreen></b-embed>
        </b-col>
    </b-row>
</div>
</template>

<script>
import SingleElementTable from "./SingleElementTable.vue"

export default {
    components: {
        SingleElementTable
    },
    props: {
        movie: Object
    }
}
</script>

<style scoped>
</style>
