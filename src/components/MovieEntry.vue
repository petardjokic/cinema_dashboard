<template>
<div>
    <b-form>
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
                    <b-form-select multiple v-model=selected.genres :options=optionsGenre></b-form-select>
                </b-form-group>
            </b-col>
            <b-col>
                <b-form-group id="fieldset-2" description="Select Production Company" label="ProductionCompany:" label-for="input-2">
                    <b-form-select multiple v-model=selected.productionCompanies :options=optionsProductionCompanies></b-form-select>
                </b-form-group>
            </b-col>
        </b-row>
        
        <p>Genres: {{selected.genreIds}}</p>
        <p>Prod. Comp.: {{selected.productionCompanyIds}}</p>
        <p>Year: {{selected.year}}</p>
        <p>Duration: {{selected.duration}}</p>
    </b-form>
</div>
</template>

<script>
export default {
    created() {
        console.log("Movie entry created!")
    },
    mounted() {
        console.log("Movie entry mounted!")
    },
    props: {
        selected: Object,
        genres: {
            type: Array,
            default () {
                return []
            }
        },
        productionCompanies: {
            type: Array,
            default () {
                return []
            }
        }
    },
    computed: {
        optionsGenre() {
            var array = []
            this.genres.forEach(genre => {
                array.push({
                    value: genre.id,
                    text: genre.name
                })
            });
            return array
        },
        optionsProductionCompanies() {
            var array = []
            this.productionCompanies.forEach(productionCompany => {
                array.push({
                    value: productionCompany.id,
                    text: productionCompany.name
                })
            });
            return array
        }
    },

}
</script>

<style scoped>

</style>
