<template>
<b-row>
    <b-col></b-col>
    <b-col cols=6>
        <b-jumbotron bg-variant="primary" text-variant="white" border-variant="dark">
            <template v-slot:header>New Movie</template>
            <hr class="my-4">
            <MovieEntry />
        </b-jumbotron>
    </b-col>
    <b-col></b-col>
</b-row>
</template>

<script>
import MovieEntry from'./MovieEntry.vue'
export default {
    components: {
        MovieEntry
    }
}
</script>

<style>

</style>
