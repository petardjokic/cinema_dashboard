<template>
<div class="movie">
    <b-container fluid>
        <b-row>
            <b-col>
                <b-row>
                    <b-col><b>Title:</b></b-col>
                </b-row>
                <b-row>
                    <b-col>{{ item.title }}</b-col>
                </b-row>
                <GenericList title="Genre" :items=item.genres></GenericList>
                <GenericList title="Prod. company" :items=item.prodComps></GenericList>
                <BigText></BigText>
            </b-col>
        </b-row>
    </b-container>
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

<style scoped>
.movie {
    
}
</style>
