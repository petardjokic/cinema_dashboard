<template>
<div>
    <b-row>
        <b-col cols=6>
            <b-form-group id="fieldset-id" label="Success:" label-for="input-id">
                <b-form-input v-model=successMessage id="input-id" type="text" placeholder="Success Message"></b-form-input>
            </b-form-group>
            <b-button @click=showSuccess variant="success">Show</b-button>
        </b-col>
    </b-row>
    <b-row>
        <b-col cols=6>
            <b-form-group id="fieldset-id" label="Error:" label-for="input-id">
                <b-form-input v-model=errorMessage id="input-id" type="text" placeholder="Error Message"></b-form-input>
            </b-form-group>
            <b-button @click=showError variant="danger">Show</b-button>
        </b-col>
    </b-row>
</div>
</template>

<script>
export default {
    data() {
        return {
            successMessage: '',
            errorMessage: '',
        }
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
        showSuccess() {
            this.showToast(this.successMessage, 'success')
        },
        showError() {
            this.showToast(this.errorMessage, 'danger')
        }
    }
}
</script>

<style>

</style>
