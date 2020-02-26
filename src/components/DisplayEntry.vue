<template>
<div>
    <b-form>
        <b-form-group id="fieldset-0" description="Display ID" label="ID:" label-for="input-0">
            <b-form-input id="input-0" type="number" disabled></b-form-input>
        </b-form-group>
        <b-row>
            <b-col>
                <b-form-group id="fieldset-1" description="Select movie" label="Movie:" label-for="input-1">
                    <b-form-select v-model=selected.movie :options=optionsMovie></b-form-select>
                </b-form-group>
            </b-col>
            <b-col>
                <b-form-group id="fieldset-2" description="Select Hall" label="Hall:" label-for="input-2">
                    <b-form-select v-model=selected.hall :options=optionsHall></b-form-select>
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
        <div v-if="selected.hall != null">
            <b-form-group v-for="(type,index) in seatTypes" :key="index" :id="'fieldset-5' + type.name" :description="'Enter price for seats ' + type.name" :label="'Price ' + type.name + ':'" label-for="input-5">
                <b-form-input v-model=selected.displayPrices[type.id] :id="'input-5' + index" type="number"></b-form-input>
            </b-form-group>
        </div>

        <p>Movie ID: {{selected.movie}}</p>
        <p>Hall ID: {{selected.hall}}</p>
        <p>TIME: {{selected.time}}</p>
        <p>DATE: {{selected.date}}</p>
        <p v-for="(type,index) in seatTypes" :key="index + '' + index">
            ID: {{type.id}} PRICE: {{selected.displayPrices[type.id]}}
        </p>
    </b-form>
</div>
</template>

<script>
export default {
    props: {
        selected: Object,
        movies: {
            type: Array,
            default () {
                return null
            }
        },
        halls: {
            type: Array,
            default () {
                return null
            }
        }
    },
    computed: {
        optionsMovie() {
            var array = []
            this.movies.forEach(movie => {
                array.push({
                    value: movie,
                    text: movie.title
                })
            });
            return array
        },
        optionsHall() {
            var array = []
            this.halls.forEach(hall => {
                array.push({
                    value: hall,
                    text: hall.name
                })
            });
            return array
        },
        seatTypes() {
            var obj = {}
            var mapped = null
            if (this.selected.hall != null) {
                mapped = this.selected.hall.seats.map(seat => seat.seatType.id)
                mapped.forEach(seatTypeId => {
                    if (obj[seatTypeId] == null) {
                        obj[seatTypeId] = this.selected.hall.seats.map(seat => seat.seatType).find(seatType => seatType.id == seatTypeId)
                    }
                })
            }
            return obj
        }
    }
}
</script>

<style scoped>

</style>
