<template>
<div>
    <b-row>
        <b-col></b-col>
        <b-col>
            <b-row class="mb-2">
                <b-col sm="3" class="text-sm-right"><b>Title:</b></b-col>
                <b-col>{{ item.title }}</b-col>
            </b-row>
            <GenericList title="Genre" :items=item.genres></GenericList>
            <GenericList title="Prod. company" :items=item.prodComps></GenericList>
            <BigText></BigText>
        </b-col>       
    </b-row>
</div>
</template>

<script>
import GenericList from './GenericList.vue'
import BigText from './BigText.vue'
export default {
    components: {
        GenericList,
        BigText
    },
    props: {
        item: Object
    }
}
</script>

<style>

</style>
