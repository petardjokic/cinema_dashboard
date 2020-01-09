<template>
<div>
    <b-row>
        <b-col>
            <h1>{{hall.title}}</h1>
        </b-col>
        <b-col class="d-none d-lg-block">
            <b-card border-variant="dark" header="CANVAS" align="center">
            </b-card>
        </b-col>
        <b-col>
            <b-row>CLASSIC: {{getSeatTypeNum(1)}}</b-row>
            <b-row>VIP: {{getSeatTypeNum(2)}}</b-row>
            <b-row>LOVE: {{getSeatTypeNum(3)}}</b-row>
        </b-col>
    </b-row>
    <p></p>
    <b-row>
    </b-row>
    <b-row v-for="(row,index) in getRows" :key="index" no-gutters>
        <b-col>
            <b-card-group colums>
                <b-card v-for="seat in getSeatsForRow(row)" :key="seat.id" :bg-variant=resolveBgColor(seat.type) style="max-width: 10rem;" text-variant="white" :header="seat.type.name" class="text-center">
                    <b-card-text>Row: {{seat.row}}<br />Column: {{seat.col}}</b-card-text>
                </b-card>
            </b-card-group>
        </b-col>
    </b-row>
</div>
</template>

<script>
export default {
    components: {},
    props: {
        hall: Object
    },
    computed: {
        getRows: function () {
            var mapped = this.hall.seats.map(seat => seat.row)
            return new Set(mapped)
        },
        getColumns: function () {
            var mapped = this.hall.seats.map(seat => seat.col)
            return new Set(mapped)
        }
    },
    methods: {
        resolveBgColor(type) {
            if (type.id === 1) {
                return "primary"
            } else if (type.id === 2) {
                return "success"
            } else if (type.id === 3) {
                return "danger"
            } else
                return "dark"
        },
        getSeatsForRow(row) {
            return this.hall.seats.filter(seat => seat.row === row)
        },
        getSeatTypeNum: function (type) {
            var arr = this.hall.seats.filter(seat => seat.type.id === type)
            return arr.length
        }
    }
}
</script>

<style>

</style>
