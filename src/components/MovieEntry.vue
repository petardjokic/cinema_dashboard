<template>
<div>
        <b-row>
            <b-col>
                <b-form-group id="fieldset-id" label="ID:" label-for="input-id">
                    <b-form-input v-model=movie.id id="input-id" placeholder="Movie ID" type="number" disabled></b-form-input>
                </b-form-group>
            </b-col>
            <b-col>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-form-group id="fieldset-title" label="Title:" label-for="input-title">
                    <b-form-input v-model=movie.title required id="input-title" placeholder="Enter title" type="text"></b-form-input>
                </b-form-group>
            </b-col>
            <b-col>
                <b-form-group id="fieldset-trailerUrl" label="Trailer:" label-for="input-trailerUrl">
                    <b-form-input v-model=movie.trailerUri required id="input-trailerUrl" placeholder="Trailer URL" type="text"></b-form-input>
                </b-form-group>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-form-group id="fieldset-releaseYear" label="Year:" label-for="input-releaseYear">
                    <b-form-input v-model=movie.releaseYear min=1 required id="input-releaseYear" placeholder="Enter year" type="number"></b-form-input>
                </b-form-group>
            </b-col>
            <b-col>
                <b-form-group id="fieldset-duration" label="Duration:" label-for="input-duration">
                    <b-form-input v-model=movie.duration min=1 required id="input-duration" placeholder="Enter duration" type="number"></b-form-input>
                </b-form-group>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-form-group id="fieldset-genre" label="Genre:" label-for="input-genre">
                    <b-form-select disabled multiple v-model=dummyArray :options=selectedGenres></b-form-select>
                    <b-button v-b-modal.genre-select-modal block variant='light'>
                        Select
                    </b-button>
                </b-form-group>
            </b-col>
            <b-col>
                <b-form-group id="fieldset-prodComp" label="ProductionCompany:" label-for="input-prodComp">
                    <b-form-select disabled multiple v-model=dummyArray :options=selectedProdComp></b-form-select>
                    <b-button v-b-modal.productionCompany-select-modal block variant='light'>
                        Select
                    </b-button>
                </b-form-group>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-form-textarea v-model=movie.description required id="textarea-small" placeholder="Enter description"></b-form-textarea>
            </b-col>
        </b-row>
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
import CINEMA_API from '../_static/CinemaAPI'
import MultipleSelect from "./MultipleSelect.vue"

export default {
    components: {
        MultipleSelect
    },
    data() {
        return {
            dummyArray: [],
            genres: [],
            productionCompanies: []
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
        const genreRequest = CINEMA_API.GENRE.getAll()
        const productionCompanyRequest = CINEMA_API.PRODUCTION_COMPANY.getAll()
        axios.all([genreRequest, productionCompanyRequest]).then(axios.spread((...responses) => {
            this.genres = responses[0].data
            this.productionCompanies = responses[1].data
        })).catch(err => {
            //modal message and router go
            console.log(err)
        })
    }
}
</script>

<style scoped>

</style>
