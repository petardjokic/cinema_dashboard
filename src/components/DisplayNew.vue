<template>
<b-container fluid>
    <b-form-group id="fieldset-1" description="Select movie" label="Movie:" label-for="input-1" :invalid-feedback="invalidFeedback" :valid-feedback="validFeedback" :state="state">
        <b-form-input id="input-1" v-model="name" :state="state" trim></b-form-input>
    </b-form-group>

    <b-form-group id="fieldset-2" description="Select Hall" label="Hall:" label-for="input-2" :invalid-feedback="invalidFeedback" :valid-feedback="validFeedback" :state="state">
        <b-form-input id="input-2" v-model="name" :state="state" trim></b-form-input>
    </b-form-group>

    <b-form-group id="fieldset-3" description="Enter time" label="Time:" label-for="input-3" :invalid-feedback="invalidFeedback" :valid-feedback="validFeedback" :state="state">
        <b-form-input id="input-3" v-model="name" :state="state" trim></b-form-input>
    </b-form-group>

    <b-form-group id="fieldset-4" description="Enter date" label="Date:" label-for="input-4" :invalid-feedback="invalidFeedback" :valid-feedback="validFeedback" :state="state">
        <b-form-input id="input-4" v-model="name" :state="state" trim></b-form-input>
    </b-form-group>
</b-container>
</template>

<script>
export default {

}
</script>

<style>

</style>
