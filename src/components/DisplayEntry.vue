<template>
<div>
    <b-form>
        <b-form-group id="fieldset-0" description="Display ID" label="ID:" label-for="input-0">
            <b-form-input v-model=display.id id="input-0" type="number" disabled></b-form-input>
        </b-form-group>
        <b-row>
            <b-col>
                <b-form-group id="fieldset-1" description="Select movie" label="Movie:" label-for="input-1">
                    <b-form-select v-model=display.movie :options=optionsMovie></b-form-select>
                </b-form-group>
            </b-col>
            <b-col>
                <b-form-group id="fieldset-2" description="Select Hall" label="Hall:" label-for="input-2">
                    <b-form-select v-model=display.hall :options=optionsHall></b-form-select>
                </b-form-group>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-form-group id="fieldset-3" description="Enter time" label="Time:" label-for="input-3">
                    <b-form-input v-model=time id="input-3" type="time"></b-form-input>
                </b-form-group>
            </b-col>
            <b-col>
                <b-form-group id="fieldset-4" description="Enter date" label="Date:" label-for="input-4">
                    <b-form-input v-model=date id="input-4" type="date"></b-form-input>
                </b-form-group>
            </b-col>
        </b-row>
        <div v-if="display.hall != null">
            <b-form-group v-for="(type,index) in seatTypes" :key="index" :id="'fieldset-5' + type.name" :description="'Enter price for seats ' + type.name" :label="'Price ' + type.name + ':'" label-for="input-5">
                <b-form-input v-model=display.prices[type.id].price :id="'input-5' + index" type="number"></b-form-input>
            </b-form-group>
        </div>

        <!-- <p>Movie ID: {{display.movie}}</p>
        <p>Hall ID: {{display.hall}}</p> -->
        <p>TIME: {{display.time}}</p>
        <p>DATE: {{display.date}}</p>
        <p v-for="(type,index) in seatTypes" :key="index + '' + index">
            ID: {{type.id}} PRICE: {{display.prices[type.id]}}
        </p>
        <p>{{display.prices}}</p>
    </b-form>
</div>
</template>

<script>
export default {
    data() {
        return {
            time: '23:11',
            date: '2020-01-23'
        }
    },
    props: {
        display: Object,
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
    mounted() {
        var arr = []
            this.display.prices.forEach(price => {
                console.log(price)
                arr[price.seatTypeId] = price
                
            })
            this.display.prices = arr
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
            if (this.display.hall != null) {
                mapped = this.display.hall.seats.map(seat => seat.seatType.id)
                mapped.forEach(seatTypeId => {
                    if (obj[seatTypeId] == null) {
                        obj[seatTypeId] = this.display.hall.seats.map(seat => seat.seatType).find(seatType => seatType.id == seatTypeId)
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
