<template>
<div>
    <b-row>
        <b-col><b>Opis:</b></b-col>
    </b-row>
    <b-row>
        <b-col>
            <b-form-textarea id="textarea-plaintext" plaintext :value="this.text" no-resize></b-form-textarea>
        </b-col>
    </b-row>

</div>
</template>

<script>
export default {
    data() {
        return {
            text: 'Ludilo mozga Jelena Rozga\nBozic je\nPucaju prangije'
        }
    }
}
</script>

<style>

</style>
