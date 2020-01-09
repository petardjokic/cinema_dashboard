<template>
<div>
    <b-row class="mb-2">
        <b-col sm="3" class="text-sm-right"><b>Opis:</b></b-col>
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
