<template>
<div>
    <b-form @submit=onSubmit>
        <DisplayEntry :display=display />
        <hr>
        <b-button block type="submit" variant="outline-light">Save</b-button>
    </b-form>
</div>
</template>

<script>
import CINEMA_API from '../_static/CinemaAPI'
import DisplayEntry from './DisplayEntry'
export default {
    components: {
        DisplayEntry
    },
    props: {
        display: Object
    },
    methods: {
        showToast(data, variant) {
            this.$bvToast.toast(data, {
                title: 'Info',
                variant: variant,
                solid: true,
                autoHideDelay: 5000,
                appendToast: false
            })
        },
        onSubmit(event) {
            event.preventDefault()
            var payload = {
                id: this.display.id,
                movie: {
                    id: this.display.movie.id
                },
                hall: {
                    id: this.display.hall.id
                },
                category: {
                    id: this.display.category.id
                },
                startsAt: this.display.startsAt,
                active: true
            }
            CINEMA_API.DISPLAY.save(payload).then(() => {
                this.showToast('Saved!', 'success')
                setTimeout(() => {
                    this.$router.replace('display-search')
                }, 2000);
            }).catch(error => {
                let errorMessage = ''
                if (error.response) {
                    // Request made and server responded
                    console.log(error.response.data.message);
                    errorMessage = error.response.data.message
                } else if (error.request) {
                    // The request was made but no response was received
                    console.log(error.request);
                    errorMessage = 'Server is unavailable'
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                    errorMessage = `ERROR: ${error.message}`
                }
                this.showToast(errorMessage, 'danger')
            })
        }
    }
}
</script>

<style>

</style>
