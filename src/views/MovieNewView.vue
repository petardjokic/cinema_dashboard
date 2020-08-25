<template>
<div class='d-flex justify-content-center'>
    <b-jumbotron container-fluid fluid :bg-variant=theme.BG_PRIMARY :text-variant=theme.TEXT_PRIMARY :border-variant=theme.BG_PRIMARY>
        <template v-slot:header>New Movie</template>
        <hr class="my-4">
        <MovieNew :movie=selected @movieSaved="movieSavedToast($event, 'success')" @error="errorToast($event, 'danger')" />
    </b-jumbotron>
</div>
</template>

<script>
import MovieNew from '../components/MovieNew.vue'
import {
    Theme
} from '../_static/Theme'
export default {
    components: {
        MovieNew
    },
    data() {
        return {
            theme: Theme,
            selected: {
                id: null,
                title: "",
                trailerUri: "",
                releaseYear: null,
                duration: null,
                description: '',
                genres: [],
                productionCompanies: []
            }
        }
    },
    methods: {
        movieSavedToast(data) {
            this.movie = {}
            this.showToast(`Saved! Movie ID: ${data.id}`, 'success')
            setTimeout(() => {
                        this.$router.replace(`/movies/${data.id}`)
                    }, 2000);
        },
        errorToast(data) {
            this.showToast(data, 'danger')
        },
        showToast(data, variant) {
            this.$bvToast.toast(data, {
                title: 'Info',
                variant: variant,
                solid: true,
                autoHideDelay: 5000,
                appendToast: false
            })
        }
    }
}
</script>

<style>

</style>
