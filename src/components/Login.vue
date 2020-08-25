<template>
<div class="d-flex justify-content-center px-5">
    <b-jumbotron class='' :bg-variant="`${theme.BG_PRIMARY}`" :text-variant="`${theme.TEXT_PRIMARY}`" :border-variant="`${theme.BG_PRIMARY}`">
        <template v-slot:header>Login</template>

        <template v-slot:lead>
            <span class='text-danger'>{{message}}</span>
        </template>
        <hr>

        <b-form @submit.prevent=submit>
            <b-form-group id="username-input-group" label="Username" label-for="username-input" description="Enter your username">
                <b-form-input id="username-input" v-model="credentials.username" type="text" required placeholder="Username"></b-form-input>
            </b-form-group>

            <b-form-group id="password-input-group" label="Password" label-for="password-input" description="Enter your password">
                <b-form-input id="password-input" v-model="credentials.password" type="password" required placeholder="Password"></b-form-input>
            </b-form-group>

            <b-button block type="submit" :variant="`${theme.TEXT_PRIMARY}`">Login</b-button>
        </b-form>
    </b-jumbotron>
</div>
</template>

<script>
import {
    Theme
} from '../_static/Theme'
import CINEMA_API from '../_static/CinemaAPI'
export default {
    data() {
        return {
            theme: Theme,
            message: '',
            credentials: {
                username: 'pera',
                password: 'Pera.brat123'
            }
        }
    },
    methods: {
        submit() {
            this.message = ''
            CINEMA_API.login(this.credentials).then(response => {
                console.log(response.data)
                this.$store.dispatch('login', response.data)
                this.$router.replace('/display-search')
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
                this.message = errorMessage
            })
        }
    }
}
</script>

<style>

</style>
