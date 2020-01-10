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
    <b-row >
        <b-col>
            <HallView :hall=display.hall :tickets=display.tickets :show="true"/>
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
                        id: 41,
                        type: {
                            id: 1,
                            name: 'Classic'
                        },
                        row: 1,
                        col: 1
                    }, {
                        id: 51,
                        type: {
                            id: 1,
                            name: 'Classic'
                        },
                        row: 1,
                        col: 2
                    }, {
                        id: 61,
                        type: {
                            id: 2,
                            name: 'VIP'
                        },
                        row: 1,
                        col: 3
                    }, {
                        id: 71,
                        type: {
                            id: 2,
                            name: 'VIP'
                        },
                        row: 1,
                        col: 4
                    }, {
                        id: 81,
                        type: {
                            id: 1,
                            name: 'Classic'
                        },
                        row: 1,
                        col: 5
                    }, {
                        id: 91,
                        type: {
                            id: 3,
                            name: 'Love'
                        },
                        row: 1,
                        col: 6
                    }, {
                        id: 101,
                        type: {
                            id: 1,
                            name: 'Classic'
                        },
                        row: 1,
                        col: 7
                    }, {
                        id: 111,
                        type: {
                            id: 2,
                            name: 'VIP'
                        },
                        row: 1,
                        col: 8
                    }, {
                        id: 121,
                        type: {
                            id: 2,
                            name: 'VIP'
                        },
                        row: 1,
                        col: 9
                    }, {
                        id: 213,
                        type: {
                            id: 2,
                            name: 'VIP'
                        },
                        row: 1,
                        col: 10
                    }, {
                        id: 214,
                        type: {
                            id: 1,
                            name: 'Classic'
                        },
                        row: 1,
                        col: 11
                    }, {
                        id: 215,
                        type: {
                            id: 0,
                            name: 'Unknown'
                        },
                        row: 1,
                        col: 12
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
                            name: 'Love'
                        },
                        row: 2,
                        col: 6
                    }, {
                        id: 10,
                        type: {
                            id: 1,
                            name: 'Classic'
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
                            id: 1,
                            name: 'Classic'
                        },
                        row: 2,
                        col: 9
                    }, {
                        id: 2213,
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
                            name: 'Unknown'
                        },
                        row: 2,
                        col: 12
                    }],
                },
                tickets: [{
                    id: 1,
                    seatId: 4
                }, {
                    id: 2,
                    seatId: 12
                }, {
                    id: 3,
                    seatId: 13
                }],
                starts_at: new Date(),
                ends_at: new Date()
            }
        }
    }
}
</script>

<style>

</style>
