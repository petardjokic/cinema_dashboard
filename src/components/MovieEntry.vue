<template>
<div >
    <b-form>
        <b-row>
            <b-col>
                <b-form-group id="fieldset-id" description="Movie ID" label="ID:" label-for="input-id">
                    <b-form-input v-model=movie.id id="input-id" type="number" disabled></b-form-input>
                </b-form-group>
            </b-col>
            <b-col>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-form-group id="fieldset-title" description="Title" label="Title:" label-for="input-title">
                    <b-form-input v-model=movie.title id="input-title" type="text"></b-form-input>
                </b-form-group>
            </b-col>
            <b-col>
                <b-form-group id="fieldset-trailerUrl" description="Trailer URL" label="Trailer:" label-for="input-trailerUrl">
                    <b-form-input v-model=movie.trailerUri id="input-trailerUrl" type="text"></b-form-input>
                </b-form-group>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-form-group id="fieldset-releaseYear" description="Year" label="Year:" label-for="input-releaseYear">
                    <b-form-input v-model=movie.releaseYear id="input-releaseYear" type="number"></b-form-input>
                </b-form-group>
            </b-col>
            <b-col>
                <b-form-group id="fieldset-duration" description="Duration" label="Duration:" label-for="input-duration">
                    <b-form-input v-model=movie.duration id="input-duration" type="number"></b-form-input>
                </b-form-group>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-form-group id="fieldset-genre" description="Select Genre" label="Genre:" label-for="input-genre">
                    <b-form-select disabled multiple v-model=dummyArray :options=selectedGenres></b-form-select>
                    <b-button v-b-modal.genre-select-modal block variant='light'>
                        Select Genres
                    </b-button>
                </b-form-group>
            </b-col>
            <b-col>
                <b-form-group id="fieldset-prodComp" description="Select Production Company" label="ProductionCompany:" label-for="input-prodComp">
                    <b-form-select disabled multiple v-model=dummyArray :options=selectedProdComp></b-form-select>
                    <b-button v-b-modal.productionCompany-select-modal block variant='light'>
                        Select Production Companies
                    </b-button>
                </b-form-group>
            </b-col>
        </b-row>
        <b-row>

            <b-col>
                <b-form-textarea v-model=movie.description id="textarea-small" placeholder="Enter description"></b-form-textarea>
            </b-col>
        </b-row>
    </b-form>
    <b-modal lazy hide-footer id="genre-select-modal" size="sm" title="Select genres">
        <MultipleSelect :items=genres :selectedList=movie.genres @selected='setSelectedGenres($event)' />
    </b-modal>
    <b-modal lazy hide-footer id="productionCompany-select-modal" size="sm" title="Select Production Companies">
        <MultipleSelect :items=productionCompanies :selectedList=movie.productionCompanies @selected='setSelectedProductionCompanies($event)' />
    </b-modal>
</div>
</template>

<script>
import axios from 'axios'
import {
    cinemaApi
} from '../_destinations/destinations.js'
import MultipleSelect from "./MultipleSelect.vue"

export default {
    components: {
        MultipleSelect
    },
    data() {
        return {
            dummyArray: [],
            genres: [],
            productionCompanies: [],
            ready: false
        }
    },
    props: {
        movie: {
            type: Object,
            default () {
                return {
                    id: null,
                    title: '',
                    trailerUri: '',
                    duration: null,
                    releaseYear: null,
                    description: '',
                    genres: [],
                    productionCompanies: []
                }
            }
        }
    },
    computed: {
        selectedGenres() {
            return this.movie.genres.map(genre => genre.name)
        },
        selectedProdComp() {
            return this.movie.productionCompanies.map(productionCompany => productionCompany.name)
        }
    },
    methods: {
        setSelectedGenres(list) {
            this.movie.genres = list
            this.$bvModal.hide('genre-select-modal')
        },
        setSelectedProductionCompanies(list) {
            this.movie.productionCompanies = list
            this.$bvModal.hide('productionCompany-select-modal')

        }
    },
    created() {
        const urlGenres = axios.get(cinemaApi.BASE_URL + cinemaApi.GENRES)
        const urlProductionCompany = axios.get(cinemaApi.BASE_URL + cinemaApi.PRODUCTION_COMPANIES)
        axios.all([urlGenres, urlProductionCompany]).then(axios.spread((...responses) => {
            this.genres = responses[0].data
            this.productionCompanies = responses[1].data
            this.ready = true
        })).catch(err => {
            //modal message and router go
            console.log(err)
        })
    }
}
</script>

<style scoped>

</style>
