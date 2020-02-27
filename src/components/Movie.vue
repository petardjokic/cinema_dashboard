<template>
<div class="movie">
    <b-row>
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
