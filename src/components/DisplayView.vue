<template>
<div>
    <b-tabs content-class="mt-3">
        <b-tab title="Display">
            <SingleElementTable :item=display type="display" :vertical="false" />
            <SingleElementTable :item=display type="ticket" :vertical="false" />
            <div>
                <b-button variant="outline-primary">Add to cart</b-button>
                <b-button variant="outline-success">Button</b-button>
                <b-button variant="outline-danger">Button</b-button>
            </div>
        </b-tab>
        <b-tab title="Movie">
            <Movie :item=display.movie />
        </b-tab>
        <b-tab title="Tickets" active>
            <HallView :hall=display.hall :tickets=display.tickets :show="true" />
        </b-tab>
    </b-tabs>
</div>
</template>

<script>
import Movie from "./Movie.vue"
import HallView from "./HallView.vue"
import SingleElementTable from "./SingleElementTable.vue"

export default {
    components: {
        Movie,
        HallView,
        SingleElementTable
    },
    props: {
        display: Object
    }
}
</script>

<style>

</style>
