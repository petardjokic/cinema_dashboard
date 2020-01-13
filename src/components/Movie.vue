<template>
<div class="movie">
    <b-row>
        <b-col>
            <div>
                <b-img src="https://cdn.onebauer.media/one/empire-tmdb/films/627/images/yfNhWKqJFWTRvSo3Qf2x1IFteG3.jpg?quality=50&width=1800&ratio=16-9&resizeStyle=aspectfill&format=jpg" fluid alt="Responsive image"></b-img>
            </div>
        </b-col>
        <b-col>
            <SingleElementTable :item=item type="movie" :vertical="true" />
        </b-col>
        <b-col>
            <b-embed type="iframe" aspect="16by9" src="https://www.youtube.com/embed/8LuxOYIpu-I" allowfullscreen></b-embed>
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
        item: Object
    }
}
</script>

<style scoped>
</style>
