<template>
    <b-container fluid>
        <b-row no-gutters>
            <b-container fluid>
                <b-row no-gutters>
                    <b-col>
                        <b-row>
                            <b-col></b-col>
                            <b-col><b>Date:</b></b-col>
                            <b-col></b-col>
                        </b-row>
                        <b-row>
                            <b-col></b-col>
                            <b-col>{{ display.starts_at.toLocaleDateString("en-US") }}</b-col>
                            <b-col></b-col>
                        </b-row>
                        <b-row>
                            <b-col></b-col>
                            <b-col><b>Time:</b></b-col>
                            <b-col></b-col>
                        </b-row>
                        <b-row>
                            <b-col></b-col>
                            <b-col>{{ display.starts_at.toLocaleTimeString() }}</b-col>
                            <b-col></b-col>
                        </b-row>
                        <b-row>
                            <b-col></b-col>
                            <b-col><b>Tickets:</b></b-col>
                            <b-col></b-col>
                        </b-row>
                        <b-row>
                            <b-col>
                                <b-button block variant="primary" size="lg">TICKETS</b-button>
                            </b-col>
                        </b-row>
                    </b-col>
                </b-row>
            </b-container>
        </b-row>
        <b-row>
            <b-col>
                <Movie :item=display.movie />
            </b-col>
        </b-row>
        <b-row no-gutters>
            <b-col>
                <HallView :hall=display.hall />
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import Movie from "./Movie.vue"
import HallView from "./HallView.vue"

export default {
    components: {
        Movie,
        HallView
    },
    data() {
        return {
            display: {
                id: 1,
                movie: {
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
                hall: {
                    title: 'Hall of Legends',
                    seats: [{
                        id: 1,
                        type: {
                            id: 1,
                            name: 'Regular'
                        },
                        row: 1,
                        col: 1
                    }, {
                        id: 2,
                        type: {
                            id: 1,
                            name: 'Regular'
                        },
                        row: 1,
                        col: 2
                    }, {
                        id: 3,
                        type: {
                            id: 3,
                            name: 'Love'
                        },
                        row: 1,
                        col: 3
                    }, {
                        id: 4,
                        type: {
                            id: 3,
                            name: 'Love'
                        },
                        row: 2,
                        col: 1
                    }, {
                        id: 5,
                        type: {
                            id: 2,
                            name: 'VIP'
                        },
                        row: 2,
                        col: 2
                    }, {
                        id: 6,
                        type: {
                            id: 2,
                            name: 'VIP'
                        },
                        row: 2,
                        col: 3
                    }, {
                        id: 7,
                        type: {
                            id: 2,
                            name: 'VIP'
                        },
                        row: 2,
                        col: 4
                    }, {
                        id: 8,
                        type: {
                            id: 2,
                            name: 'VIP'
                        },
                        row: 2,
                        col: 5
                    }, {
                        id: 9,
                        type: {
                            id: 3,
                            name: 'VIP'
                        },
                        row: 2,
                        col: 6
                    }, {
                        id: 10,
                        type: {
                            id: 1,
                            name: 'VIP'
                        },
                        row: 2,
                        col: 7
                    }, {
                        id: 11,
                        type: {
                            id: 2,
                            name: 'VIP'
                        },
                        row: 2,
                        col: 8
                    }, {
                        id: 12,
                        type: {
                            id: 2,
                            name: 'VIP'
                        },
                        row: 2,
                        col: 9
                    }, {
                        id: 13,
                        type: {
                            id: 2,
                            name: 'VIP'
                        },
                        row: 2,
                        col: 10
                    }, {
                        id: 14,
                        type: {
                            id: 2,
                            name: 'VIP'
                        },
                        row: 2,
                        col: 11
                    }, {
                        id: 15,
                        type: {
                            id: 0,
                            name: 'VIP'
                        },
                        row: 2,
                        col: 12
                    }]
                },
                starts_at: new Date(),
                ends_at: new Date()
            }
        }
    }
}
</script>

<style>

</style>
