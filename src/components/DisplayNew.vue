<template>
<div class='rrr'>
<b-row >
    <b-col></b-col>
    <b-col>
        <b-form @submit="onSubmit" @reset="onReset">
            <b-form-group id="fieldset-0" description="Display ID" label="ID:" label-for="input-0">
                <b-form-input id="input-0" type="number" disabled></b-form-input>
            </b-form-group>
            <b-row>
                <b-col>
                    <b-form-group id="fieldset-1" description="Select movie" label="Movie:" label-for="input-1">
                        <b-form-select v-model=selected.movieId :options=optionsMovie></b-form-select>
                    </b-form-group>
                </b-col>
                <b-col>
                    <b-form-group id="fieldset-2" description="Select Hall" label="Hall:" label-for="input-2">
                        <b-form-select v-model=selected.hallId :options=optionsHall></b-form-select>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-form-group id="fieldset-3" description="Enter time" label="Time:" label-for="input-3">
                        <b-form-input v-model=selected.time id="input-3" type="time"></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col>
                    <b-form-group id="fieldset-4" description="Enter date" label="Date:" label-for="input-4">
                        <b-form-input v-model=selected.date id="input-4" type="date"></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>

            <b-form-group v-for="type in seatType" :key="type.id" :id="'fieldset-5' + type.id" :description="'Enter price for seats ' + type.name" :label="'Price ' + type.name + ':'" label-for="input-5">
                <b-form-input v-model=selected.prices[type.id] :id="'input-5' + type.id" type="number"></b-form-input>
            </b-form-group>
            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
            <p>Movie ID: {{selected.movieId}}</p>
            <p>Hall ID: {{selected.hallId}}</p>
            <p>TIME: {{selected.time}}</p>
            <p>DATE: {{selected.date}}</p>
            <p v-for="type in seatType" :key="type.id + '' + type.id">
                ID: {{type.id}} PRICE: {{selected.prices[type.id]}}
            </p>
            <p>{{selected.prices.length}}</p>
        </b-form>
    </b-col>
    <b-col></b-col>
</b-row>
</div>
</template>

<script>
export default {
    data() {
        return {
            selected: {
                id: null,
                movieId: null,
                hallId: null,
                time: null,
                date: null,
                prices: []
            },
            data: {
                movie: [{
                    id: 1,
                    title: "Wow"
                }, {
                    id: 2,
                    title: "Hush"
                }],
                hall: [{
                    id: 1,
                    name: "LLL"
                }, {
                    id: 2,
                    name: "HHH"
                }]
            },
            seatType: [{
                id: 1,
                name: "VIP"
            }, {
                id: 5,
                name: "Classic"
            }, {
                id: 2,
                name: "Love"
            }]
        }
    },
    computed: {
        optionsMovie() {
            var array = []
            this.data.movie.forEach(movie => {
                array.push({
                    value: movie.id,
                    text: movie.title
                })
            });
            return array
        },
        optionsHall() {
            var array = []
            this.data.hall.forEach(hall => {
                array.push({
                    value: hall.id,
                    text: hall.name
                })
            });
            return array
        }
    },
    methods: {
        onSubmit() {
            this.onReset()
        },
        onReset() {
            this.selected = {
                movieId: null,
                hallId: null,
                time: null,
                date: null,
                prices: []
            }
        }
    }

}
</script>

<style scoped>
    
</style>
