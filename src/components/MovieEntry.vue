<template>
<div>
    <b-form @submit="onSubmit" @reset="onReset">
        <b-form-group id="fieldset-0" description="Movie ID" label="ID:" label-for="input-0">
            <b-form-input id="input-0" type="number" disabled></b-form-input>
        </b-form-group>
        <b-row>
            <b-col>
                <b-form-group id="fieldset-01" description="Year" label="Year:" label-for="input-01">
            <b-form-input v-model=selected.year id="input-01" type="number"></b-form-input>
        </b-form-group>
            </b-col>
            <b-col>
                <b-form-group id="fieldset-02" description="Duration" label="Duration:" label-for="input-02">
            <b-form-input v-model=selected.duration id="input-02" type="number"></b-form-input>
        </b-form-group>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-form-group id="fieldset-1" description="Select Genre" label="Genre:" label-for="input-1">
                    <b-form-select multiple v-model=selected.genreIds :options=optionsGenre></b-form-select>
                </b-form-group>
            </b-col>
            <b-col>
                <b-form-group id="fieldset-2" description="Select Production Company" label="ProductionCompany:" label-for="input-2">
                    <b-form-select multiple v-model=selected.productionCompanyIds :options=optionsProductionCompanies></b-form-select>
                </b-form-group>
            </b-col>
        </b-row>
        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
        <p>Genres: {{selected.genreIds}}</p>
        <p>Prod. Comp.: {{selected.productionCompanyIds}}</p>
        <p>Year: {{selected.year}}</p>
        <p>Duration: {{selected.duration}}</p>        
    </b-form>
</div>
</template>

<script>
    export default {
        data() {
            return {
                selected: {
                    id: null,
                    year: null,
                    duration: null,
                    genreIds: [],
                    productionCompanyIds: []
                },
                data: {
                    genres: [{
                        id: 1,
                        name: "Comedy"
                    }, {
                        id: 2,
                        name: "Horror"
                    }],
                    productionCompanies: [{
                        id: 1,
                        name: "LLL"
                    }, {
                        id: 2,
                        name: "HHH"
                    }]
                }
            }
        },
        computed: {
            optionsGenre() {
                var array = []
                this.data.genres.forEach(genre => {
                    array.push({
                        value: genre.id,
                        text: genre.name
                    })
                });
                return array
            },
            optionsProductionCompanies() {
                var array = []
                this.data.productionCompanies.forEach(productionCompany => {
                    array.push({
                        value: productionCompany.id,
                        text: productionCompany.name
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
