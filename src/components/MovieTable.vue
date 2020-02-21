<template>
<div>
    <b-table fixed hover small table-variant="primary" :items="items" :fields="fields" striped responsive="sm">
        <template v-slot:cell(show_details)="row">
            <b-button size="sm" @click="row.toggleDetails" class="mr-2">
                {{ row.detailsShowing ? 'Hide' : 'Show'}} Details
            </b-button>
        </template>

        <template v-slot:row-details="row">
            <b-card>
                <Movie :item="row.item"></Movie>
                <b-button size="sm" @click="row.toggleDetails">Hide Details</b-button>
            </b-card>
        </template>
    </b-table>
</div>
</template>

<script>
import Movie from './Movie.vue'

export default {
    components: {
        Movie
    },
    data() {
        return {
            fields: ['title', 'duration', 'year', 'show_details'],
            items: [{
                    id: 40,
                    title: 'Trainspotting',
                    duration: 120,
                    year: 1995,
                    genres: [{
                            id: 1,
                            name: 'Comedy'
                        },
                        {
                            id: 2,
                            name: 'Horror'
                        }
                    ],
                    prodComps: [{
                            id: 1,
                            name: 'Warner Bros.'
                        },
                        {
                            id: 2,
                            name: '24H20'
                        },
                        {
                            id: 3,
                            name: 'Pop art'
                        }
                    ]
                },
                {
                    id: 21,
                    title: 'Larsen',
                    duration: 136,
                    year: 1996
                },
                {
                    id: 89,
                    title: 'Geneva',
                    duration: 96,
                    year: 1997
                },
                {
                    id: 38,
                    title: 'Jami',
                    duration: 210,
                    year: 1998
                }
            ]
        }
    },
    methods: {}
}
</script>
