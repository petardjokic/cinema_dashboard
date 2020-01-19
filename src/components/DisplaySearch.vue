<template>
<div>
    <b-table hover small table-variant="info" :items="getItems" :fields="fields" striped responsive="sm">
        <template v-slot:cell(show_details)="row">
            <b-button size="sm" @click="row.toggleDetails" class="mr-2">
                {{ row.detailsShowing ? 'Hide' : 'Show'}} Details
            </b-button>
        </template>

        <template v-slot:row-details="row">
            <b-card>
                <DisplayView :display="findDisplay(row.item.id)"></DisplayView>
                <b-button size="sm" @click="row.toggleDetails">Hide Details</b-button>
            </b-card>
        </template>
    </b-table>
</div>
</template>

<script>
import DisplayView from './DisplayView.vue'

export default {
    components: {
        DisplayView
    },
    data() {
        return {
            fields: ['date', 'time', 'movie', 'hall', 'show_details']
        }
    },
    computed: {
        getItems() {
            var mapped = []
            this.$store.getters.getDisplays.forEach(disp => mapped.push({
                id: disp.id,
                date: disp.starts_at.toLocaleDateString(),
                time: disp.starts_at.toLocaleTimeString(),
                movie: disp.movie.title,
                hall: disp.hall.title

            }))
            return mapped
        }
    },
    methods: {
        findDisplay(dispId) {
            return this.$store.getters.getDisplayById(dispId)
        }
    }
}
</script>
