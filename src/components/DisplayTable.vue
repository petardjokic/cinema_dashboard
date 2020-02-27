<template>
  <div>
    <b-table hover small  :items="getItems" :fields="fields" striped responsive="sm">
        <template v-slot:cell(show_details)="row">
            <b-button size="sm" @click="row.toggleDetails" class="mr-2">
                {{ row.detailsShowing ? 'Hide' : 'Show'}} Details
            </b-button>
        </template>

        <template v-slot:cell(edit)="row">
            <b-button v-b-modal.movie-edit-modal size="sm" variant='success'>
                <b-icon icon="pencil"></b-icon>
            </b-button>
        </template>

        <template v-slot:cell(delete)="row">
            <b-button size="sm" variant='danger' >
                <b-icon icon="trash"></b-icon>
            </b-button>
        </template>

        <template v-slot:row-details="row">
            <b-card>
                <Display :display="findDisplay(row.item.id)" />
                <b-button size="sm" @click="row.toggleDetails">Hide Details</b-button>
            </b-card>
        </template>
    </b-table>
</div>
</template>

<script>
import Display from './Display.vue'
export default {
    components: {
        Display
    },
    data() {
        return {
            fields: ['date', 'time', 'movie', 'hall', 'show_details','edit', 'delete'],
            displays: []
        }
    },
    props: {
        items: Array
    },
    computed: {
        getItems() {
            var mapped = []
            this.items.forEach(disp => {
                if (disp != null) {
                    mapped.push({
                        id: disp.id,
                        date: disp.startsAt,
                        time: disp.startsAt,
                        movie: disp.movie.title,
                        hall: disp.hall.name

                    })
                }
            })
            return mapped
        }
    },
    methods: {
        findDisplay(rowItemId) {
            const arr =this.items.filter(display => display.id === rowItemId)
            return arr[0]
        }
    },
    created() {
        
    }
}
</script>
